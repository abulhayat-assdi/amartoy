"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAction, signupAction } from "@/app/actions/auth";

interface AuthPageClientProps {
  defaultIsLogin?: boolean;
}

export function AuthPageClient({ defaultIsLogin = true }: AuthPageClientProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/profile/";

  async function onSubmit(formData: FormData) {
    setError("");
    formData.append("redirectTo", redirectTarget);

    startTransition(async () => {
      const result = isLogin ? await loginAction(formData) : await signupAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <section className="auth-page">
      <div className={`auth-card ${isLogin ? "auth-card--login" : ""}`}>
        <div className="auth-card__header auth-card__header--center">
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p>{isLogin ? "Sign in to your account" : "Join us today! Enter your details below."}</p>
        </div>

        <form className="auth-form" action={onSubmit}>
          {!isLogin && (
            <label className="auth-field">
              <span>Full Name</span>
              <div className="auth-input auth-input--icon">
                <User size={18} />
                <input
                  className="auth-input__control"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  required={!isLogin}
                />
              </div>
            </label>
          )}

          <label className="auth-field">
            <span>Email or Phone Number</span>
            <div className="auth-input auth-input--icon">
              <Mail size={18} />
              <input
                className="auth-input__control"
                name="credential"
                placeholder="name@example.com or 01XXXXXXXXX"
                type="text"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input auth-input--password">
              <LockKeyhole size={18} />
              <input
                className="auth-input__control"
                name="password"
                placeholder="******"
                type={showPassword ? "text" : "password"}
                required
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

          {isLogin && (
            <div className="auth-meta">
              <a className="auth-link" href="/contact/">
                Forgot Password?
              </a>
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}

          <Button className="auth-submit auth-submit--login" type="submit" disabled={isPending}>
            {isPending ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={18} />
          </Button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="auth-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Register here" : "Log in here"}
          </button>
        </p>
      </div>
    </section>
  );
}
