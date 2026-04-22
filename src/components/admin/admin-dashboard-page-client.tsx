import { adminActivities, adminMetrics, adminPageContent } from "@/data/admin";

export function AdminDashboardPageClient() {
  return (
    <div className="admin-page">
      <section className="admin-page__header">
        <div>
          <p className="admin-page__eyebrow">{adminPageContent.dashboard.eyebrow}</p>
          <h2 className="admin-page__title">{adminPageContent.dashboard.title}</h2>
          <p className="admin-page__description">{adminPageContent.dashboard.description}</p>
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

      <section className="admin-grid">
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

        <article className="admin-panel">
          <h3>Quick Summary</h3>
          <div className="admin-summary-list">
            <div>
              <strong>Featured catalog synced</strong>
              <p>Homepage and shop product cards are ready for updates.</p>
            </div>
            <div>
              <strong>Cart and wishlist flows restored</strong>
              <p>Local storefront state is available again for shoppers.</p>
            </div>
            <div>
              <strong>Contact and content screens restored</strong>
              <p>Public pages and admin management screens are back in place.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
