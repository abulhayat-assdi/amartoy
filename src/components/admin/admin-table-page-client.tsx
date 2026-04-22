"use client";

import { Eye, PencilLine, Search, Trash2, Upload } from "lucide-react";
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
        <div className="admin-section-title">
          <span />
          <div>
            <h2 className="admin-page__title">{title}</h2>
            <p className="admin-page__description">{description}</p>
          </div>
        </div>

        <div className="admin-page__actions">
          <button className="admin-btn admin-btn--soft" type="button">
            <Upload size={16} />
            Upload File
          </button>
          <button className="admin-btn" type="button">
            Manage
          </button>
        </div>
      </section>

      <section className="admin-panel admin-workspace">
        <div className="admin-workspace__header">
          <div>
            <p className="admin-page__eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <span className="admin-badge">{filteredRows.length} items</span>
        </div>

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
        </div>

        <div className="admin-resource-list">
          {filteredRows.map((row) => (
            <article className="admin-resource-item" key={row.id}>
              <div className="admin-resource-item__main">
                <div className="admin-resource-item__icon">{row.primary.slice(0, 2).toUpperCase()}</div>
                <div className="admin-resource-item__content">
                  <div className="admin-resource-item__heading">
                    <strong>{row.primary}</strong>
                    <span className={`admin-status admin-status--${row.status.tone}`}>{row.status.label}</span>
                  </div>
                  <p>{row.secondary}</p>
                  <div className="admin-resource-item__meta">
                    <span>
                      {columnLabels[0]}: {row.columns[0]}
                    </span>
                    <span>
                      {columnLabels[1]}: {row.columns[1]}
                    </span>
                    <span>ID: {row.id}</span>
                  </div>
                </div>
              </div>

              <div className="admin-resource-item__actions">
                <button className="admin-icon-btn admin-icon-btn--soft" type="button" aria-label="View">
                  <Eye size={16} />
                </button>
                <button className="admin-icon-btn admin-icon-btn--soft" type="button" aria-label="Edit">
                  <PencilLine size={16} />
                </button>
                <button className="admin-icon-btn admin-icon-btn--soft" type="button" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
