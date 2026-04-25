"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { adminLoginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, null);

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

        <form className="admin-login__form" action={formAction}>
          {state?.error && <p style={{ color: "red", fontSize: "0.875rem" }}>{state.error}</p>}
          <label>
            <span>Email</span>
            <input className="admin-input" name="email" defaultValue="admin@amartoy.com" type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input className="admin-input" name="password" defaultValue="demo-password" type="password" required />
          </label>
          <button className="admin-btn admin-btn--full" type="submit" disabled={isPending}>
            <LockKeyhole size={18} />
            {isPending ? "Signing in..." : "Open Admin Portal"}
          </button>
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
