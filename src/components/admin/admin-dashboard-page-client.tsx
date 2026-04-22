import { CalendarDays, Clock3, Plus, Speaker } from "lucide-react";
import { adminActivities, adminMetrics, adminPageContent } from "@/data/admin";

export function AdminDashboardPageClient() {
  return (
    <div className="admin-page">
      <section className="admin-hero-card">
        <span className="admin-hero-card__bubble admin-hero-card__bubble--one" />
        <span className="admin-hero-card__bubble admin-hero-card__bubble--two" />
        <span className="admin-hero-card__bubble admin-hero-card__bubble--three" />

        <div className="admin-hero-card__copy">
          <p className="admin-page__eyebrow admin-page__eyebrow--light">{adminPageContent.dashboard.eyebrow}</p>
          <h2 className="admin-hero-card__title">Assalamu Alaikum, Abul Hayat</h2>
          <p className="admin-hero-card__description">{adminPageContent.dashboard.description}</p>
          <div className="admin-hero-card__meta">
            <span>
              <CalendarDays size={18} />
              Wednesday, April 22, 2026
            </span>
            <span>
              <Clock3 size={18} />
              11:00:09 AM
            </span>
          </div>
        </div>
      </section>

      <section className="admin-metrics">
        {adminMetrics.map((metric) => (
          <article className="admin-metric-card" key={metric.label}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.trend}</span>
          </article>
        ))}
      </section>

      <section className="admin-board">
        <div className="admin-board__heading">
          <div className="admin-section-title">
            <span />
            <div>
              <h3>Notice Board</h3>
              <p>1 notice</p>
            </div>
          </div>

          <div className="admin-board__actions">
            <button className="admin-btn admin-btn--soft" type="button">
              <Plus size={16} />
              Add Notice
            </button>
            <button className="admin-btn" type="button">
              <Speaker size={16} />
              Add Notice for Students
            </button>
          </div>
        </div>

        <div className="admin-board__grid">
          <article className="admin-panel admin-panel--notice">
            <div className="admin-panel__meta-row">
              <h3>Class Schedule Update</h3>
              <span className="admin-status admin-status--info">Today</span>
            </div>
            <p>Please check the updated class schedule for this week. Resource materials and session notes are now aligned.</p>
            <div className="admin-note-date">
              <CalendarDays size={16} />
              Jan 24, 2026
            </div>
          </article>

          <article className="admin-panel">
            <h3>Recent Activity</h3>
            <div className="admin-activity-list">
              {adminActivities.map((activity) => (
                <div className="admin-activity" key={activity.title}>
                  <span className={`admin-status admin-status--${activity.status}`}>{activity.status}</span>
                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="admin-board">
        <div className="admin-section-title">
          <span />
          <div>
            <h3>Student Notice</h3>
            <p>0 notices</p>
          </div>
        </div>

        <article className="admin-panel admin-panel--empty">
          <p>No student notices yet. Click “Add Notice for Students” to post one.</p>
        </article>
      </section>
    </div>
  );
}
