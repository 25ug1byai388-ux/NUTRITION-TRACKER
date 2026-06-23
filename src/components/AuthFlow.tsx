// src/components/AuthFlow.tsx - Authentication UI with NextAuth Integration

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const AuthFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email/Password Authentication (optional - requires additional provider)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // This is optional - you'd need to add Credentials provider to auth.ts
      // For now, we focus on Google OAuth
      console.log("Email auth not configured. Use Google Sign-In.");
      setError("Please use Google Sign-In to continue.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const result = await signIn("google", {
        callbackUrl: callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Google sign-in failed. Please try again.");
        console.error("Google sign-in error:", result.error);
      } else if (result?.ok) {
        // Redirect on success
        router.push(callbackUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Google sign-in error:", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  // GitHub Sign-In Handler (optional - add to providers if needed)
  const handleGitHubSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const result = await signIn("github", {
        callbackUrl: callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("GitHub sign-in failed. Please try again.");
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          padding: "2rem",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              margin: "0 0 0.5rem",
              color: "#111827",
            }}
          >
            🥗 NutriAI
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
            Your AI-Powered Nutrition Companion
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "1rem",
              color: "#DC2626",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#FFFFFF",
            border: "2px solid #E5E7EB",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "16px",
            cursor: googleLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s",
            opacity: googleLoading ? 0.6 : 1,
            marginBottom: "1rem",
          }}
          onMouseEnter={(e) => {
            if (!googleLoading) {
              (e.target as HTMLElement).style.background = "#F9FAFB";
              (e.target as HTMLElement).style.borderColor = "#D1D5DB";
            }
          }}
          onMouseLeave={(e) => {
            if (!googleLoading) {
              (e.target as HTMLElement).style.background = "#FFFFFF";
              (e.target as HTMLElement).style.borderColor = "#E5E7EB";
            }
          }}
        >
          {googleLoading ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  border: "2px solid #D1D5DB",
                  borderTopColor: "#667eea",
                  borderRadius: "50%",
                  animation: "spin 0.6s linear infinite",
                }}
              />
              Signing in...
            </>
          ) : (
            <>
              <span style={{ fontSize: "20px" }}>🔐</span>
              Sign in with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
          <span style={{ color: "#9CA3AF", fontSize: "14px" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
        </div>

        {/* Email/Password Form (Optional) */}
        <form onSubmit={handleEmailSubmit} style={{ marginBottom: "1rem" }}>
          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "#374151",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "#374151",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "#374151",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Sign In / Sign Up */}
        <p style={{ textAlign: "center", color: "#6B7280", fontSize: "14px", margin: 0 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>

        {/* Footer */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #E5E7EB",
            textAlign: "center",
            fontSize: "12px",
            color: "#9CA3AF",
          }}
        >
          <p style={{ margin: 0, marginBottom: "0.5rem" }}>
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              style={{ color: "#667eea", textDecoration: "none" }}
            >
              Terms of Service
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            Questions?{" "}
            <Link
              href="/contact"
              style={{ color: "#667eea", textDecoration: "none" }}
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthFlow;
