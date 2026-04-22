"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginStoredUser } from "@/lib/auth";

export function LoginPage() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credential.trim() || !password) {
      setError("Please enter your mobile/email and password.");
      return;
    }

    const result = loginStoredUser(credential.trim(), password);
    if (result.ok) {
      router.push("/profile/");
      return;
    }

    if ("message" in result) {
      setError(result.message);
      return;
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--login">
        <div className="auth-card__header auth-card__header--center">
          <h1>Login</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Phone Number or Email</span>
            <div className="auth-input auth-input--icon">
              <input
                className="auth-input__control"
                placeholder="Enter mobile number or email"
                type="text"
                value={credential}
                onChange={(event) => setCredential(event.target.value)}
              />
              <Smartphone size={18} />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input auth-input--password">
              <LockKeyhole size={18} />
              <input
                className="auth-input__control"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="auth-input__toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <div className="auth-meta">
            <Link className="auth-link" href="/contact/">
              Forgot Password?
            </Link>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <Button className="auth-submit auth-submit--login" type="submit">
            Sign In
            <ArrowRight size={18} />
          </Button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/register/">Create an Account</Link>
        </p>
      </div>
    </section>
  );
}
