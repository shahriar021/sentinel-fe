"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // <-- import Link from Next.js

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Email and password are required");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5005/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      router.push("/dashboard"); // success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label>Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-6">
        <label>Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* ✅ Senior-level signup link */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
