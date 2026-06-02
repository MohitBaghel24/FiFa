"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // If auth is loaded and user is not logged in, trigger the modal
    if (!isLoading && !isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowModal(true);
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        {/* Spinner */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          border: "3px solid var(--border)", borderTopColor: "var(--accent)",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>
        {/* Blank layout waiting for auth */}
        {showModal && (
          <AuthModal onClose={() => setShowModal(false)} />
        )}
      </div>
    );
  }

  // If logged in, render the protected content
  return <>{children}</>;
}
