"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [childAge, setChildAge] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  // Pre-fill email if redirected from login
  React.useEffect(() => {
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile || !childAge) {
      setError("Please fill all fields.");
      return;
    }
    // TODO: Replace with real registration logic
    // Simulate registration and login
    router.push("/profile/");
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 400 }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="detail-card" style={{ display: "grid", gap: 16 }}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Mobile Number
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
          <label>
            আপনার সন্তানের বয়স কত?
            <input
              type="number"
              min="0"
              value={childAge}
              onChange={e => setChildAge(e.target.value)}
              required
            />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </section>
  );
}
