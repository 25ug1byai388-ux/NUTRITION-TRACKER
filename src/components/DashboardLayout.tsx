// src/components/DashboardLayout.tsx - Layout with Authentication Integration

"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show loading state
  if (status === "loading") {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#F9FAFB",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #E5E7EB",
            borderTopColor: "#10B981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1rem",
          }} />
          <p style={{ color: "#6B7280", fontWeight: 600 }}>Loading...</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // Show unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          maxWidth: "400px",
        }}>
          <h1 style={{ fontSize: "28px", margin: "0 0 1rem", color: "#111827" }}>
            🥗 NutriAI
          </h1>
          <p style={{ color: "#6B7280", marginBottom: "1.5rem" }}>
            Sign in to access your nutrition tracker
          </p>
          <Link
            href="/auth/signin"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Main authenticated layout
  return (
    <div
      style={{
        background: darkMode ? "#111827" : "#FFFFFF",
        color: darkMode ? "#F3F4F6" : "#111827",
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: darkMode ? "linear-gradient(135deg, #1F2937, #111827)" : "linear-gradient(135deg, #F9FAFB, #F3F4F6)",
          borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
              background: "linear-gradient(135deg, #10B981, #059669)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🥗 NutriAI
          </Link>

          {/* Right Side - User Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: darkMode ? "#374151" : "#E5E7EB",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* User Profile Menu */}
            {session?.user && (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "2px solid #E5E7EB",
                      cursor: "pointer",
                    }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  />
                )}

                {/* Dropdown Menu */}
                {mobileMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "60px",
                      right: "20px",
                      background: darkMode ? "#1F2937" : "white",
                      border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                      borderRadius: "8px",
                      padding: "0.5rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      minWidth: "200px",
                      zIndex: 1000,
                    }}
                  >
                    <div style={{ padding: "1rem", borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>
                        {session.user.name}
                      </p>
                      <p style={{ margin: "0.5rem 0 0", fontSize: "12px", color: "#6B7280" }}>
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      style={{
                        display: "block",
                        padding: "0.75rem 1rem",
                        color: darkMode ? "#F3F4F6" : "#111827",
                        textDecoration: "none",
                        fontSize: "14px",
                        borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                      }}
                    >
                      👤 Profile Settings
                    </Link>

                    <form
                      action={async () => {
                        await signOut({ redirectTo: "/auth/signin" });
                      }}
                      style={{ margin: 0 }}
                    >
                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          background: "none",
                          border: "none",
                          color: "#EF4444",
                          textAlign: "left",
                          fontSize: "14px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        🚪 Sign Out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
          background: darkMode ? "#1F2937" : "white",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            padding: "0.5rem 1.5rem",
            gap: "0.5rem",
          }}
        >
          {[
            { href: "/dashboard", label: "📊 Dashboard" },
            { href: "/meals", label: "🔍 Meals" },
            { href: "/recipes", label: "👨‍🍳 Recipes" },
            { href: "/meal-planner", label: "📅 Planner" },
            { href: "/water-tracker", label: "💧 Water" },
            { href: "/achievements", label: "🏆 Awards" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
                whiteSpace: "nowrap",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2.5rem 1.5rem",
          borderTop: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
          color: "#6B7280",
          fontSize: "13px",
          background: darkMode ? "#1F2937" : "#F9FAFB",
          marginTop: "3rem",
        }}
      >
        <p style={{ margin: 0 }}>
          🥗 <strong>NutriAI</strong> © 2026 | Your AI-Powered Nutrition Companion
        </p>
        <p style={{ margin: "0.5rem 0 0", fontSize: "12px" }}>
          Authenticated as: <strong>{session?.user?.email}</strong>
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;

// ============================================================================
// USAGE IN YOUR APP
// ============================================================================
// 
// In your page.tsx files:
//
// import DashboardLayout from "@/components/DashboardLayout";
//
// export default function DashboardPage() {
//   return (
//     <DashboardLayout>
//       <YourContent />
//     </DashboardLayout>
//   );
// }
//
// This automatically:
// ✅ Checks user is authenticated (via middleware)
// ✅ Shows loading state while checking
// ✅ Displays user info in header
// ✅ Provides sign-out button
// ✅ Dark mode toggle
// ✅ Navigation menu
//
