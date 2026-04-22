export function AdminSettingsPageClient() {
  return (
    <div className="admin-page">
      <section className="admin-page__header">
        <div className="admin-section-title">
          <span />
          <div>
            <h2 className="admin-page__title">Store Settings</h2>
            <p className="admin-page__description">
              Payment, branding, contact, and notification settings are restored as an admin workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="admin-grid">
        <article className="admin-panel admin-panel--form">
          <h3>Store Profile</h3>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Store name</span>
              <input className="admin-input" defaultValue="AmarToy" placeholder="Store name" />
            </label>
            <label className="admin-field">
              <span>Support email</span>
              <input className="admin-input" defaultValue="hello@amartoy.com" placeholder="Support email" />
            </label>
            <label className="admin-field">
              <span>Phone number</span>
              <input className="admin-input" defaultValue="+880 1700 000000" placeholder="Phone number" />
            </label>
            <label className="admin-field">
              <span>Location</span>
              <input className="admin-input" defaultValue="Dhaka, Bangladesh" placeholder="Location" />
            </label>
          </div>
          <div className="admin-page__actions">
            <button className="admin-btn admin-btn--soft" type="button">
              Reset
            </button>
            <button className="admin-btn" type="button">
              Save Changes
            </button>
          </div>
        </article>

        <article className="admin-panel">
          <h3>Operational Preferences</h3>
          <div className="admin-summary-list">
            <div>
              <strong>Order notifications</strong>
              <p>Enabled for new checkout events and payment confirmations.</p>
            </div>
            <div>
              <strong>Inventory alerts</strong>
              <p>Low-stock thresholds active for featured and fast-selling items.</p>
            </div>
            <div>
              <strong>Publishing mode</strong>
              <p>Homepage, blog, and about page content are ready for manual publish flow.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
