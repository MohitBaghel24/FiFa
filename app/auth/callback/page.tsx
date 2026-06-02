"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, createUserProfile, getUserProfile } from "@/lib/appwrite";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        const user = await getCurrentUser();
        if (user) {
          const existing = await getUserProfile(user.$id);
          if (!existing) {
            await createUserProfile(user.$id, user.name, user.email);
          }
          window.location.href = "/";
        } else {
          window.location.href = "/?error=true";
        }
      } catch {
        window.location.href = "/?error=true";
      }
    }
    handleCallback();
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0D1117",
      display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column", gap: 16
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid #00FF87",
        borderTopColor: "transparent",
        animation: "spin 0.8s linear infinite"
      }} />
      <p style={{ color: "#00FF87", fontFamily: "monospace",
        letterSpacing: "0.1em" }}>
        AUTHENTICATING...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
