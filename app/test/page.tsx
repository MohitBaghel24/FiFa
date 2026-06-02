"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function TestPage() {
  const { user, isLoggedIn, loginGoogle } = useAuth();
  const [dbStatus, setDbStatus] = useState("Testing database...");
  const [dbOk,     setDbOk]     = useState(false);

  useEffect(() => {
    getPosts(1)
      .then(posts => {
        setDbOk(true);
        setDbStatus("Database connected! Posts collection working.");
      })
      .catch(() => {
        setDbStatus("Database error. Check collection IDs.");
      });
  }, []);

  const s: React.CSSProperties = {
    minHeight:"100vh", background:"#0D1117",
    color:"white", fontFamily:"monospace",
    padding:40, display:"flex",
    flexDirection:"column", gap:20,
  };

  return (
    <div style={s}>
      <h1 style={{ color:"#00FF87", fontSize:24, letterSpacing:"0.1em" }}>
        SYSTEM DIAGNOSTICS
      </h1>

      <div style={{ background:"#161B22", borderRadius:12,
        border:"1px solid #30363D", padding:24, display:"flex",
        flexDirection:"column", gap:12 }}>

        <p style={{ margin:0, color: dbOk ? "#00FF87" : "#FF4757" }}>
          {dbOk ? "✅" : "❌"} APPWRITE DATABASE: {dbStatus}
        </p>

        <p style={{ margin:0, color: isLoggedIn ? "#00FF87" : "#FFD700" }}>
          {isLoggedIn ? "✅" : "⚠️"} AUTH: {
            isLoggedIn
              ? `Logged in as ${user?.name} (${user?.email})`
              : "Not logged in"
          }
        </p>

        <p style={{ margin:0, color:"#FFD700" }}>
          ⚠️ FOOTBALL API: Add your key to .env.local to enable live scores
        </p>
      </div>

      {!isLoggedIn && (
        <button onClick={loginGoogle}
          style={{
            padding:"14px 32px", borderRadius:8, border:"none",
            background:"#00FF87", color:"#0D1117",
            fontWeight:700, fontSize:16, cursor:"pointer",
            letterSpacing:"0.1em", width:"fit-content",
          }}>
          TEST GOOGLE LOGIN →
        </button>
      )}

      {isLoggedIn && (
        <div style={{ background:"#0D2818", borderRadius:8,
          border:"1px solid #00FF87", padding:16 }}>
          <p style={{ margin:0, color:"#00FF87" }}>
            ✅ Google Auth working! User: {user?.name}
          </p>
        </div>
      )}

      <Link href="/" style={{ color:"#8B949E", marginTop:20 }}>
        ← Back to app
      </Link>
    </div>
  );
}
