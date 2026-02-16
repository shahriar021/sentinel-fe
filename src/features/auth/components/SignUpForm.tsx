"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkBox,setCheckBox]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const role=checkBox?"admin":"user"
    console.log(role,"=-==-=-");
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      
      const res = await fetch("http://localhost:5005/api/users/register", {
        method: "POST",
        credentials: "include", // important for cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      router.push("/auth/login"); // redirect to login after successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label>Name</label>
        <input type="text" className="w-full border px-3 py-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-4">
        <label>Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-4">
        <label>Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <label>Confirm Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {
        <p onClick={() => setCheckBox(!checkBox)} className="flex flex-row mt-3 gap-2 ">
          <CheckIcon className={`h-6 w-6 ${checkBox ? "text-green-600" : "text-black"} bg-amber-200 rounded-md`} />
          sign up as admin
        </p>
      }

      {/* Link to login */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
