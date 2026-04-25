"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  ShoppingCart,
  Heart,
  TrendingUp,
  Award,
  BanknoteIcon,
  MessageSquare,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyVS {
  day: string;
  visitors: number;
  sales: number;
}

interface DailySupport {
  day: string;
  total: number;
  replied: number;
  notReplied: number;
}

interface AnalyticsData {
  dateFrom: string;
  dateTo: string;
  totalVisitors: number;
  totalCartAdds: number;
  totalWishlists: number;
  totalSales: number;
  totalRevenue: number;
  topSellingProduct: { name: string; qty: number } | null;
  dailyVisitorsAndSales: DailyVS[];
  supportStats: {
    totalMessages: number;
    totalReplied: number;
    totalNotReplied: number;
    daily: DailySupport[];
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount);
}

function getMonthRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    from: `${from.getFullYear()}-${pad(from.getMonth() + 1)}-01`,
    to: `${to.getFullYear()}-${pad(to.getMonth() + 1)}-${pad(to.getDate())}`,
  };
}

function shortDay(isoDay: string) {
  const d = new Date(isoDay + "T00:00:00");
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ─── Chart Options ────────────────────────────────────────────────────────────

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#64748b",
        font: { size: 12, family: "'Inter', sans-serif" },
        boxWidth: 14,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.92)",
      titleColor: "#f1f5f9",
      bodyColor: "#cbd5e1",
      padding: 12,
      cornerRadius: 10,
      titleFont: { size: 13, weight: "bold" as const },
      bodyFont: { size: 12 },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#94a3b8",
        font: { size: 11, family: "'Inter', sans-serif" },
        maxRotation: 45,
      },
    },
    y: {
      grid: { color: "rgba(148,163,184,0.12)" },
      ticks: {
        color: "#94a3b8",
        font: { size: 11, family: "'Inter', sans-serif" },
        precision: 0,
      },
      beginAtZero: true,
    },
  },
  barPercentage: 0.65,
  categoryPercentage: 0.75,
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: string;
  loading: boolean;
}

function KpiCard({ icon, label, value, sub, accent, loading }: KpiCardProps) {
  return (
    <div className="dash-kpi-card" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="dash-kpi-card__icon">{icon}</div>
      <div className="dash-kpi-card__body">
        <p className="dash-kpi-card__label">{label}</p>
        {loading ? (
          <div className="dash-kpi-card__skeleton" />
        ) : (
          <strong className="dash-kpi-card__value">{value}</strong>
        )}
        {sub && !loading && <span className="dash-kpi-card__sub">{sub}</span>}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminDashboardPageClient() {
  const { from: defaultFrom, to: defaultTo } = getMonthRange();

  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (from: string, to: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics?from=${from}T00:00:00Z&to=${to}T23:59:59Z`);
      if (!res.ok) throw new Error("Failed to load analytics data");
      const json: AnalyticsData = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(dateFrom, dateTo);
  }, []);

  const handleApply = () => {
    if (dateFrom && dateTo && dateFrom <= dateTo) {
      fetchAnalytics(dateFrom, dateTo);
    }
  };

  const handleReset = () => {
    setDateFrom(defaultFrom);
    setDateTo(defaultTo);
    fetchAnalytics(defaultFrom, defaultTo);
  };

  // Chart data: Visitors & Sales
  const vsLabels = (data?.dailyVisitorsAndSales || []).map((d) => shortDay(d.day));
  const vsVisitors = (data?.dailyVisitorsAndSales || []).map((d) => d.visitors);
  const vsSales = (data?.dailyVisitorsAndSales || []).map((d) => d.sales);

  const vsChartData = {
    labels: vsLabels,
    datasets: [
      {
        label: "Visitors",
        data: vsVisitors,
        backgroundColor: "rgba(99, 102, 241, 0.82)",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Sales",
        data: vsSales,
        backgroundColor: "rgba(20, 184, 166, 0.82)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  // Chart data: Support Messages
  const spLabels = (data?.supportStats?.daily || []).map((d) => shortDay(d.day));
  const spTotal = (data?.supportStats?.daily || []).map((d) => d.total);
  const spReplied = (data?.supportStats?.daily || []).map((d) => d.replied);
  const spNotReplied = (data?.supportStats?.daily || []).map((d) => d.notReplied);

  const spChartData = {
    labels: spLabels,
    datasets: [
      {
        label: "Messages Sent",
        data: spTotal,
        backgroundColor: "rgba(99, 102, 241, 0.82)",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Replied",
        data: spReplied,
        backgroundColor: "rgba(34, 197, 94, 0.82)",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "No Reply",
        data: spNotReplied,
        backgroundColor: "rgba(239, 68, 68, 0.78)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="admin-page dash-page">
      {/* ── Hero Banner (kept) ──────────────────────────────────────────────── */}
      <section className="admin-hero-card">
        <span className="admin-hero-card__bubble admin-hero-card__bubble--one" />
        <span className="admin-hero-card__bubble admin-hero-card__bubble--two" />
        <span className="admin-hero-card__bubble admin-hero-card__bubble--three" />
        <div className="admin-hero-card__copy">
          <p className="admin-page__eyebrow admin-page__eyebrow--light">Statistics & Analytics</p>
          <h2 className="admin-hero-card__title">Assalamu Alaikum, Abul Hayat</h2>
          <p className="admin-hero-card__description">
            Track visitors, sales, revenue, wishlist, cart, and live support activity for any date range.
          </p>
          <div className="admin-hero-card__meta">
            <span>
              <CalendarDays size={18} />
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span>
              <Clock3 size={18} />
              {new Date().toLocaleTimeString("en-US")}
            </span>
          </div>
        </div>
      </section>

      {/* ── Date Range Picker ───────────────────────────────────────────────── */}
      <section className="dash-date-bar">
        <div className="dash-date-bar__inner">
          <CalendarDays size={18} className="dash-date-bar__icon" />
          <div className="dash-date-bar__group">
            <label htmlFor="dash-date-from">From</label>
            <input
              id="dash-date-from"
              type="date"
              value={dateFrom}
              max={dateTo}
              onChange={(e) => setDateFrom(e.target.value)}
              className="dash-date-input"
            />
          </div>
          <span className="dash-date-bar__sep">—</span>
          <div className="dash-date-bar__group">
            <label htmlFor="dash-date-to">To</label>
            <input
              id="dash-date-to"
              type="date"
              value={dateTo}
              min={dateFrom}
              onChange={(e) => setDateTo(e.target.value)}
              className="dash-date-input"
            />
          </div>
          <div className="dash-date-bar__actions">
            <button
              className="dash-date-btn dash-date-btn--primary"
              onClick={handleApply}
              disabled={loading}
              type="button"
              id="dash-apply-date"
            >
              {loading ? <RefreshCw size={15} className="dash-spin" /> : null}
              Apply
            </button>
            <button
              className="dash-date-btn dash-date-btn--soft"
              onClick={handleReset}
              disabled={loading}
              type="button"
              id="dash-reset-date"
            >
              This Month
            </button>
          </div>
        </div>
        {data && !loading && (
          <p className="dash-date-bar__range-label">
            Showing data: <strong>{formatDate(dateFrom)}</strong> → <strong>{formatDate(dateTo)}</strong>
          </p>
        )}
      </section>

      {/* ── Error State ─────────────────────────────────────────────────────── */}
      {error && (
        <div className="dash-error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
          <button onClick={handleApply} type="button">Retry</button>
        </div>
      )}

      {/* ── KPI Cards ───────────────────────────────────────────────────────── */}
      <section className="dash-kpi-grid">
        <KpiCard
          icon={<Users size={22} />}
          label="Total Visitors"
          value={loading ? "" : (data?.totalVisitors ?? 0).toLocaleString()}
          sub="This period"
          accent="#6366f1"
          loading={loading}
        />
        <KpiCard
          icon={<ShoppingCart size={22} />}
          label="Add to Cart"
          value={loading ? "" : (data?.totalCartAdds ?? 0).toLocaleString()}
          sub="Products added"
          accent="#0ea5e9"
          loading={loading}
        />
        <KpiCard
          icon={<Heart size={22} />}
          label="Wishlisted"
          value={loading ? "" : (data?.totalWishlists ?? 0).toLocaleString()}
          sub="Products saved"
          accent="#ec4899"
          loading={loading}
        />
        <KpiCard
          icon={<TrendingUp size={22} />}
          label="Total Sales"
          value={loading ? "" : (data?.totalSales ?? 0).toLocaleString()}
          sub="Units sold"
          accent="#14b8a6"
          loading={loading}
        />
        <KpiCard
          icon={<BanknoteIcon size={22} />}
          label="Total Revenue"
          value={loading ? "" : formatCurrency(data?.totalRevenue ?? 0)}
          sub="Transaction volume"
          accent="#f59e0b"
          loading={loading}
        />
        <KpiCard
          icon={<Award size={22} />}
          label="Top Selling Product"
          value={loading ? "" : (data?.topSellingProduct?.name ?? "N/A")}
          sub={
            loading || !data?.topSellingProduct
              ? undefined
              : `${data.topSellingProduct.qty} units sold`
          }
          accent="#8b5cf6"
          loading={loading}
        />
        <KpiCard
          icon={<MessageSquare size={22} />}
          label="Support Messages"
          value={loading ? "" : (data?.supportStats?.totalMessages ?? 0).toLocaleString()}
          sub="Total received"
          accent="#6366f1"
          loading={loading}
        />
        <KpiCard
          icon={<CheckCircle2 size={22} />}
          label="Replied"
          value={loading ? "" : (data?.supportStats?.totalReplied ?? 0).toLocaleString()}
          sub={
            loading || !data
              ? undefined
              : `${data.supportStats.totalMessages > 0 ? Math.round((data.supportStats.totalReplied / data.supportStats.totalMessages) * 100) : 0}% reply rate`
          }
          accent="#22c55e"
          loading={loading}
        />
        <KpiCard
          icon={<XCircle size={22} />}
          label="Not Replied"
          value={loading ? "" : (data?.supportStats?.totalNotReplied ?? 0).toLocaleString()}
          sub="Pending responses"
          accent="#ef4444"
          loading={loading}
        />
      </section>

      {/* ── Chart 1: Visitors & Sales ────────────────────────────────────────── */}
      <section className="dash-chart-section">
        <div className="dash-chart-header">
          <div className="dash-chart-title">
            <TrendingUp size={20} />
            <div>
              <h3>Daily Visitors & Sales</h3>
              <p>Clustered column chart — visitors vs sales per day</p>
            </div>
          </div>
        </div>
        <div className="dash-chart-body">
          {loading ? (
            <div className="dash-chart-skeleton">
              {[55, 80, 45, 70, 90, 40, 65, 78, 50, 85].map((h, i) => (
                <div key={i} className="dash-chart-skeleton__bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : vsLabels.length === 0 ? (
            <div className="dash-chart-empty">
              <TrendingUp size={40} />
              <p>No visitor or sales data for this period.</p>
            </div>
          ) : (
            <Bar
              data={vsChartData}
              options={{
                ...baseChartOptions,
                plugins: {
                  ...baseChartOptions.plugins,
                  title: { display: false },
                  legend: {
                    ...baseChartOptions.plugins.legend,
                  },
                },
              }}
            />
          )}
        </div>
      </section>

      {/* ── Chart 2: Live Support Messages ──────────────────────────────────── */}
      <section className="dash-chart-section">
        <div className="dash-chart-header">
          <div className="dash-chart-title">
            <MessageSquare size={20} />
            <div>
              <h3>Daily Live Support Activity</h3>
              <p>Messages sent · Replied · Awaiting reply per day</p>
            </div>
          </div>
          {/* Summary Pills */}
          {!loading && data && (
            <div className="dash-support-pills">
              <span className="dash-pill dash-pill--total">
                <MessageSquare size={13} /> {data.supportStats.totalMessages} Total
              </span>
              <span className="dash-pill dash-pill--replied">
                <CheckCircle2 size={13} /> {data.supportStats.totalReplied} Replied
              </span>
              <span className="dash-pill dash-pill--noreply">
                <XCircle size={13} /> {data.supportStats.totalNotReplied} No Reply
              </span>
            </div>
          )}
        </div>
        <div className="dash-chart-body">
          {loading ? (
            <div className="dash-chart-skeleton">
              {[60, 40, 75, 55, 88, 45, 70, 50, 65, 82].map((h, i) => (
                <div key={i} className="dash-chart-skeleton__bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : spLabels.length === 0 ? (
            <div className="dash-chart-empty">
              <MessageSquare size={40} />
              <p>No support message data for this period.</p>
            </div>
          ) : (
            <Bar
              data={spChartData}
              options={{
                ...baseChartOptions,
                plugins: {
                  ...baseChartOptions.plugins,
                  title: { display: false },
                },
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
