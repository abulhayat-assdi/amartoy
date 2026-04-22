import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <section className="admin-login">
      <div className="admin-login__panel">
        <div className="admin-login__intro">
          <p className="eyebrow">Recovered Admin Access</p>
          <h1>Sign in to AmarToy Admin</h1>
          <p>
            The original admin routes were missing from source, so this login screen and portal structure have been
            restored from project artifacts.
          </p>
        </div>

        <form className="admin-login__form">
          <label>
            <span>Email</span>
            <input className="admin-input" defaultValue="admin@amartoy.com" type="email" />
          </label>
          <label>
            <span>Password</span>
            <input className="admin-input" defaultValue="demo-password" type="password" />
          </label>
          <Link className="admin-btn admin-btn--full" href="/admin/dashboard/">
            <LockKeyhole size={18} />
            Open Admin Portal
          </Link>
        </form>

        <div className="admin-login__meta">
          <span className="admin-badge admin-badge--dark">
            <ShieldCheck size={14} />
            Firebase-ready structure preserved
          </span>
          <Link href="/">Back to storefront</Link>
        </div>
      </div>
    </section>
  );
}
