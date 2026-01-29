"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useSignIn();
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!signIn) {
      setError("Clerk not initialized. Please try again.");
      return;
    }

    try {
      setLoading(true);

      // Create Clerk session
      const attempt = await signIn.create({
        identifier: email,
        password,
      });

      const sessionId = attempt.createdSessionId;
      if (!sessionId) {
        setError("Failed to create session.");
        return;
      }

      // Get Clerk user ID via secure server route
      const userRes = await fetch(`/api/get-clerk-user?sessionId=${sessionId}`);
      const userData = await userRes.json();
      const clerkUserId = userData.id;

      if (!clerkUserId) {
        setError("Failed to retrieve user ID.");
        return;
      }

      // Get role securely from server route
      const roleRes = await fetch(`/api/get-user-role?clerkUserId=${clerkUserId}`);
      const roleData = await roleRes.json();
      const role = roleData.role;

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      console.error(err);

      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError("No account found with this email.");
      } else if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Incorrect password. Please try again.");
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
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-1">Log in to continue</p>

        <div className="space-y-5 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black/20 focus:outline-none text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black/20 focus:outline-none text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <motion.button
          onClick={handleLogin}
          disabled={loading || !email || password.length < 8}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 bg-black text-white rounded-xl hover:bg-black/90 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <motion.button
          onClick={() => router.push("/signup")}
          whileHover={{ scale: 1.02 }}
          className="mt-4 w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
        >
          Create a New Account
        </motion.button>
      </motion.div>
    </div>
  );
}








