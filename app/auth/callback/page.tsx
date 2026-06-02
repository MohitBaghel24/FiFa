// IMPORTANT: In Appwrite Console → Auth → Settings → Google OAuth
// Success URL must be: http://localhost:3000/auth/callback
// Failure URL must be: http://localhost:3000/
// 
// In Google Cloud Console → Credentials → OAuth Client
// Authorized redirect URIs must include:
// https://nyc.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/6a19d4d900257711b7a4
// AND
// http://localhost:3000/auth/callback

"use client";
import { useEffect, useState } from "react";
import { account, databases, DB_ID, COL } from "@/lib/appwrite";

export default function AuthCallback() {
  const [status, setStatus] = useState("Authenticating...");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;

    async function tryGetUser() {
      attempts++;
      try {
        setStatus("Connecting to server...");

        // Wait for Appwrite session to settle (cookie propagation)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = await account.get();
        if (!user) throw new Error("No user found");

        setStatus("Welcome " + user.name + "!");

        // Create user profile if first time
        try {
          await databases.getDocument(DB_ID, COL.USERS, user.$id);
        } catch {
          // Profile doesn't exist — create it
          try {
            await databases.createDocument(
              DB_ID, COL.USERS, user.$id,
              {
                userId: user.$id,
                name: user.name,
                email: user.email,
                avatar: "",
                favoriteTeam: "Global",
                fanPoints: 0,
                globalRank: 0,
                badges: [],
                createdAt: new Date().toISOString(),
              }
            );
          } catch (profileErr) {
            console.error("Profile creation skipped:", profileErr);
          }
        }

        // Hard redirect to force Next.js remount and cookie re-evaluation
        setTimeout(() => {
          window.location.href = "/";
        }, 500);

      } catch (err) {
        console.error(`Auth attempt ${attempts} failed:`, err);

        if (attempts < maxAttempts) {
          setStatus(`Retrying... (${attempts}/${maxAttempts})`);
          setTimeout(tryGetUser, 1000);
        } else {
          setStatus("Auth failed. Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      }
    }

    tryGetUser();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      fontFamily: "monospace",
    }}>
      <div style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: "3px solid var(--border)",
        borderTopColor: "var(--accent)",
        animation: "spin 0.8s linear infinite",
      }} />

      <p style={{ color: "var(--accent)", fontSize: 16, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {status}
      </p>
      <p style={{ color: "#484F58", fontSize: 12 }}>
        Please wait...
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
