"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { AdminTableRow } from "@/data/admin";

interface AdminTablePageClientProps {
  eyebrow: string;
  title: string;
  description: string;
  rows: AdminTableRow[];
  columnLabels: [string, string];
}

export function AdminTablePageClient({
  eyebrow,
  title,
  description,
  rows,
  columnLabels,
}: AdminTablePageClientProps) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return rows;

    return rows.filter((row) =>
      [row.id, row.primary, row.secondary, ...row.columns, row.status.label]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [query, rows]);

  return (
    <div className="admin-page">
      <section className="admin-page__header">
        <div>
          <p className="admin-page__eyebrow">{eyebrow}</p>
          <h2 className="admin-page__title">{title}</h2>
          <p className="admin-page__description">{description}</p>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-table-toolbar">
          <div className="admin-input--icon">
            <Search size={16} />
            <input
              className="admin-input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, email, category, or ID..."
              value={query}
            />
          </div>
          <span className="admin-badge">{filteredRows.length} results</span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>{columnLabels[0]}</th>
                <th>{columnLabels[1]}</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.primary}</strong>
                    <p>
                      {row.secondary} • {row.id}
                    </p>
                  </td>
                  <td>{row.columns[0]}</td>
                  <td>{row.columns[1]}</td>
                  <td>
                    <span className={`admin-status admin-status--${row.status.tone}`}>{row.status.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
