"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, LockKeyhole, Mail, Smartphone, User, VenusAndMars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { registerStoredUser } from "@/lib/auth";

const genderOptions = ["Male", "Female", "Other"] as const;

function formatDateForDisplay(value: string): string {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<(typeof genderOptions)[number]>("Male");
  const [error, setError] = useState("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const emailParam = params.get("email");
    const mobileParam = params.get("mobile");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (mobileParam) {
      setMobile(mobileParam);
    }
  }, [params]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword || !mobile.trim() || !dateOfBirth) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    const result = registerStoredUser({
      name: name.trim(),
      email: email.trim(),
      password,
      mobile: mobile.trim(),
      dateOfBirth,
      gender,
    });

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
      <div className="auth-card">
        <div className="auth-card__header">
          <h1>Create Account</h1>
          <p>Join us today! Enter your details below.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Full Name</span>
            <div className="auth-input auth-input--icon">
              <User size={18} />
              <input
                className="auth-input__control"
                placeholder="Your Name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Phone Number</span>
            <div className="auth-input auth-input--with-prefix">
              <span className="auth-flag" aria-hidden="true">
                BD
              </span>
              <Smartphone size={18} />
              <input
                className="auth-input__control"
                placeholder="01XXXXXXXXX"
                type="tel"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Email Address</span>
            <div className="auth-input auth-input--icon">
              <Mail size={18} />
              <input
                className="auth-input__control"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>

          <div className="auth-grid auth-grid--two">
            <label className="auth-field">
              <span>Password</span>
              <div className="auth-input auth-input--icon">
                <LockKeyhole size={18} />
                <input
                  className="auth-input__control"
                  placeholder="******"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Confirm</span>
              <div className="auth-input auth-input--icon">
                <LockKeyhole size={18} />
                <input
                  className="auth-input__control"
                  placeholder="******"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="auth-grid auth-grid--two">
            <label className="auth-field">
              <span>Date of Birth</span>
              <button
                className={`auth-input auth-input--date-trigger${dateOfBirth ? " auth-input--filled" : ""}`}
                type="button"
                onClick={() => {
                  if (dateInputRef.current?.showPicker) {
                    dateInputRef.current.showPicker();
                  } else {
                    dateInputRef.current?.focus();
                  }
                }}
              >
                <CalendarDays size={18} />
                <span className={dateOfBirth ? "auth-date-value" : "auth-date-placeholder"}>
                  {dateOfBirth ? formatDateForDisplay(dateOfBirth) : "Select date of birth"}
                </span>
                <input
                  ref={dateInputRef}
                  className="auth-date-native"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </button>
            </label>

            <div className="auth-field">
              <span>Gender</span>
              <div className="auth-gender-group" role="radiogroup" aria-label="Gender">
                {genderOptions.map((option) => (
                  <button
                    key={option}
                    className={`auth-gender-option${gender === option ? " auth-gender-option--active" : ""}`}
                    type="button"
                    onClick={() => setGender(option)}
                  >
                    <VenusAndMars size={16} />
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <Button className="auth-submit" type="submit">
            Create Account
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login/">Log in</Link>
        </p>
      </div>
    </section>
  );
}
