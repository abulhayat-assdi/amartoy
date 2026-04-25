import { NextRequest, NextResponse } from "next/server";
import { supabaseRestRequest } from "@/lib/supabase-rest";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyRow {
  day: string;
  count: number;
}

interface ProductSaleRow {
  product_name: string;
  total_qty: number;
  total_revenue: number;
}

interface SupportRow {
  day: string;
  total: number;
  replied: number;
  not_replied: number;
}

export interface AnalyticsDashboardData {
  dateFrom: string;
  dateTo: string;
  totalVisitors: number;
  totalCartAdds: number;
  totalWishlists: number;
  totalSales: number;
  totalRevenue: number;
  topSellingProduct: { name: string; qty: number } | null;
  dailyVisitorsAndSales: { day: string; visitors: number; sales: number }[];
  supportStats: {
    totalMessages: number;
    totalReplied: number;
    totalNotReplied: number;
    daily: { day: string; total: number; replied: number; notReplied: number }[];
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Default: current month
    const now = new Date();
    const defaultFrom = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const defaultTo = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const dateFrom = searchParams.get("from") || defaultFrom;
    const dateTo = searchParams.get("to") || defaultTo;

    // ── 1. Total Visitors ───────────────────────────────────────────────────
    const visitorsCountRows = await supabaseRestRequest<{ count: string }[]>(
      `/rest/v1/analytics_visitors?select=count&visited_at=gte.${encodeURIComponent(dateFrom)}&visited_at=lte.${encodeURIComponent(dateTo)}`,
      { headers: { Prefer: "count=exact", Range: "0-0" } },
      true,
    ).catch(() => null);

    // Use header count instead — fetch minimal rows and read count
    const visitorsTotal = await fetchCount("analytics_visitors", "visited_at", dateFrom, dateTo);
    const cartTotal = await fetchCount("analytics_cart_events", "added_at", dateFrom, dateTo);
    const wishlistTotal = await fetchCount("analytics_wishlist_events", "added_at", dateFrom, dateTo);
    const salesTotal = await fetchCount("analytics_sales", "sold_at", dateFrom, dateTo);

    // ── 2. Total Revenue ────────────────────────────────────────────────────
    const revenueRows = await supabaseRestRequest<{ total_amount: number }[]>(
      `/rest/v1/analytics_sales?select=total_amount&sold_at=gte.${encodeURIComponent(dateFrom)}&sold_at=lte.${encodeURIComponent(dateTo)}`,
      {},
      true,
    ).catch(() => [] as { total_amount: number }[]);

    const totalRevenue = (revenueRows || []).reduce((sum, r) => sum + (Number(r.total_amount) || 0), 0);

    // ── 3. Top Selling Product ──────────────────────────────────────────────
    const topProductRows = await supabaseRestRequest<ProductSaleRow[]>(
      `/rest/v1/rpc/get_top_selling_product?date_from=${encodeURIComponent(dateFrom)}&date_to=${encodeURIComponent(dateTo)}`,
      { method: "POST" },
      true,
    ).catch(() => null);

    // Fallback: manually aggregate
    const allSales = await supabaseRestRequest<{ product_name: string; quantity: number }[]>(
      `/rest/v1/analytics_sales?select=product_name,quantity&sold_at=gte.${encodeURIComponent(dateFrom)}&sold_at=lte.${encodeURIComponent(dateTo)}`,
      {},
      true,
    ).catch(() => [] as { product_name: string; quantity: number }[]);

    const productMap: Record<string, number> = {};
    (allSales || []).forEach((s) => {
      if (s.product_name) {
        productMap[s.product_name] = (productMap[s.product_name] || 0) + (s.quantity || 1);
      }
    });
    const topSellingProduct =
      Object.keys(productMap).length > 0
        ? {
            name: Object.entries(productMap).sort((a, b) => b[1] - a[1])[0][0],
            qty: Object.entries(productMap).sort((a, b) => b[1] - a[1])[0][1],
          }
        : null;

    // ── 4. Daily Visitors & Sales ───────────────────────────────────────────
    const dailyVisitors = await fetchDailyRows("analytics_visitors", "visited_at", dateFrom, dateTo);
    const dailySales = await fetchDailyRows("analytics_sales", "sold_at", dateFrom, dateTo);

    const daySet = new Set([...dailyVisitors.map((d) => d.day), ...dailySales.map((d) => d.day)]);
    const visitorsMap: Record<string, number> = Object.fromEntries(dailyVisitors.map((d) => [d.day, d.count]));
    const salesMap: Record<string, number> = Object.fromEntries(dailySales.map((d) => [d.day, d.count]));

    const dailyVisitorsAndSales = Array.from(daySet)
      .sort()
      .map((day) => ({
        day,
        visitors: visitorsMap[day] || 0,
        sales: salesMap[day] || 0,
      }));

    // ── 5. Support Stats ────────────────────────────────────────────────────
    const supportRows = await supabaseRestRequest<{ sent_at: string; replied: boolean }[]>(
      `/rest/v1/analytics_support_messages?select=sent_at,replied&sender=eq.user&sent_at=gte.${encodeURIComponent(dateFrom)}&sent_at=lte.${encodeURIComponent(dateTo)}`,
      {},
      true,
    ).catch(() => [] as { sent_at: string; replied: boolean }[]);

    const supportDailyMap: Record<string, { total: number; replied: number; notReplied: number }> = {};
    let totalMessages = 0;
    let totalReplied = 0;

    (supportRows || []).forEach((row) => {
      const day = row.sent_at?.split("T")[0] || "";
      if (!supportDailyMap[day]) supportDailyMap[day] = { total: 0, replied: 0, notReplied: 0 };
      supportDailyMap[day].total++;
      if (row.replied) {
        supportDailyMap[day].replied++;
        totalReplied++;
      } else {
        supportDailyMap[day].notReplied++;
      }
      totalMessages++;
    });

    const supportDailyArr = Object.entries(supportDailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, v]) => ({ day, ...v }));

    const result: AnalyticsDashboardData = {
      dateFrom,
      dateTo,
      totalVisitors: visitorsTotal,
      totalCartAdds: cartTotal,
      totalWishlists: wishlistTotal,
      totalSales: salesTotal,
      totalRevenue,
      topSellingProduct,
      dailyVisitorsAndSales,
      supportStats: {
        totalMessages,
        totalReplied,
        totalNotReplied: totalMessages - totalReplied,
        daily: supportDailyArr,
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Analytics API]", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchCount(table: string, dateCol: string, from: string, to: string): Promise<number> {
  try {
    const rows = await supabaseRestRequest<{ id: number }[]>(
      `/rest/v1/${table}?select=id&${dateCol}=gte.${encodeURIComponent(from)}&${dateCol}=lte.${encodeURIComponent(to)}`,
      {},
      true,
    );
    return (rows || []).length;
  } catch {
    return 0;
  }
}

async function fetchDailyRows(table: string, dateCol: string, from: string, to: string): Promise<DailyRow[]> {
  try {
    const rows = await supabaseRestRequest<{ date_day: string }[]>(
      `/rest/v1/rpc/get_daily_counts_${table}?date_from=${encodeURIComponent(from)}&date_to=${encodeURIComponent(to)}`,
      { method: "POST" },
      true,
    );
    if (rows && rows.length > 0) {
      return rows.map((r: any) => ({ day: r.date_day, count: Number(r.cnt) }));
    }
  } catch {
    // fall through to manual aggregation
  }

  // Manual aggregation
  try {
    const rows = await supabaseRestRequest<Record<string, string>[]>(
      `/rest/v1/${table}?select=${dateCol}&${dateCol}=gte.${encodeURIComponent(from)}&${dateCol}=lte.${encodeURIComponent(to)}`,
      {},
      true,
    );

    const dayMap: Record<string, number> = {};
    (rows || []).forEach((r) => {
      const raw = r[dateCol] as string;
      const day = raw?.split("T")[0];
      if (day) dayMap[day] = (dayMap[day] || 0) + 1;
    });

    return Object.entries(dayMap).map(([day, count]) => ({ day, count }));
  } catch {
    return [];
  }
}
