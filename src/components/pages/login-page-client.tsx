"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import type { LoginPageContent } from "@/types/loginpage";

interface LoginPageProps {
  content: LoginPageContent;
}

export function LoginPage({ content }: LoginPageProps) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/profile/";
  const supabase = createClient();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credential.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: credential.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTarget);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--login">
        <div className="auth-card__header auth-card__header--center">
          <h1>{content.title}</h1>
          {content.subtitle ? <p>{content.subtitle}</p> : null}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>{content.emailLabel}</span>
            <div className="auth-input auth-input--icon">
              <input
                className="auth-input__control"
                placeholder={content.emailPlaceholder}
                type="text"
                value={credential}
                onChange={(event) => setCredential(event.target.value)}
              />
              <Smartphone size={18} />
            </div>
          </label>

          <label className="auth-field">
            <span>{content.passwordLabel}</span>
            <div className="auth-input auth-input--password">
              <LockKeyhole size={18} />
              <input
                className="auth-input__control"
                placeholder={content.passwordPlaceholder}
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
              {content.forgotPasswordText}
            </Link>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <Button className="auth-submit auth-submit--login" type="submit" disabled={loading}>
            {loading ? "Signing In..." : content.submitButtonText}
            <ArrowRight size={18} />
          </Button>
        </form>

        <p className="auth-switch">
          {content.registerPromptText} <Link href="/register/">{content.registerLinkText}</Link>
        </p>
      </div>
    </section>
  );
}
