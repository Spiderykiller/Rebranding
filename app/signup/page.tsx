"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useSignUp();
  const router = useRouter();

  const handleSignup = async () => {
    setError("");

    if (!email || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!signUp) {
      setError("Clerk not initialized. Please try again.");
      return;
    }

    try {
      setLoading(true);

      // Create user in Clerk
      const result = await signUp.create({ emailAddress: email, password });
      const clerkUserId = signUp.createdUserId;

      if (!clerkUserId) {
        setError("Failed to retrieve Clerk user ID");
        return;
      }

      // Call secure server route to create Strapi profile
      const res = await fetch("/api/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId, email }),
      });

      if (!res.ok) {
        console.error("Strapi profile creation failed", await res.text());
        setError("Failed to create profile. Please contact support.");
        return;
      }

      router.push("/profile");
    } catch (err: any) {
      console.error(err);

      if (err.errors?.[0]?.code === "user_already_exists") {
        setError("This email is already registered. Try logging in.");
      } else if (err.errors?.[0]?.code === "invalid_email") {
        setError("Please enter a valid email address.");
      } else if (err.errors?.[0]?.code === "password_too_weak") {
        setError("Password must be at least 8 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-black/5"
      >
        <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
        <p className="text-gray-600 mt-1">Join us and start exploring</p>

        <div className="space-y-5 mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black/20 focus:outline-none text-gray-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black/20 focus:outline-none text-gray-900"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-red-600 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Clerk CAPTCHA goes here */}
        <div id="clerk-captcha" className="mt-4" />

        <motion.button
          onClick={handleSignup}
          disabled={loading || !email || password.length < 8}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 bg-black text-white rounded-xl hover:bg-black/90 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </motion.button>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 w-full py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
        >
          Already have an account? Log in
        </button>
      </motion.div>
    </div>
  );
}


