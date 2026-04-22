"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real auth logic
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate: If email not found, redirect to register
    if (email.endsWith("@new.com")) {
      router.push("/register/?email=" + encodeURIComponent(email));
      return;
    }
    // Simulate login success
    router.push("/profile/");
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 400 }}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="detail-card" style={{ display: "grid", gap: 16 }}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit">Login</Button>
        </form>
        <div style={{ marginTop: 16 }}>
          New user? <Link href="/register/">Register here</Link>
        </div>
      </div>
    </section>
  );
}
