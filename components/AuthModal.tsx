"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { loginGoogle, loginEmail, register } = useAuth();
  const [mode,     setMode]     = useState<"login" | "register">("login");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit() {
    setError(""); setLoading(true);
    try {
      if (mode === "login") await loginEmail(email, password);
      else await register(email, password, name);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#161B22", border: "1px solid #30363D",
          borderRadius: 16, padding: 40, width: "100%", maxWidth: 400,
          display: "flex", flexDirection: "column", gap: 20,
        }}
      >
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ color: "#00FF87", fontFamily: "monospace",
            fontSize: 22, letterSpacing: "0.1em", margin: 0 }}>
            AUTHENTICATE
          </h2>
          <button onClick={onClose}
            style={{ background:"none", border:"none",
              color:"#8B949E", fontSize:20, cursor:"pointer" }}>✕</button>
        </div>

        {/* Google Login */}
        <button
          onClick={loginGoogle}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:12, padding:"12px 20px", borderRadius:8,
            background:"white", color:"#0D1117", fontWeight:700,
            fontSize:14, border:"none", cursor:"pointer",
            letterSpacing:"0.05em",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ flex:1, height:1, background:"#30363D" }} />
          <span style={{ color:"#484F58", fontSize:12 }}>OR</span>
          <div style={{ flex:1, height:1, background:"#30363D" }} />
        </div>

        {/* Mode toggle */}
        <div style={{ display:"flex", gap:8 }}>
          {(["login","register"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{
                flex:1, padding:"8px", borderRadius:6, border:"1px solid",
                borderColor: mode===m ? "#00FF87" : "#30363D",
                background: mode===m ? "rgba(0,255,135,0.1)" : "transparent",
                color: mode===m ? "#00FF87" : "#8B949E",
                fontFamily:"monospace", fontSize:12,
                textTransform:"uppercase", letterSpacing:"0.08em",
                cursor:"pointer",
              }}>
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Fields */}
        {mode === "register" && (
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="Username"
            style={{ padding:"12px 16px", borderRadius:8, border:"1px solid #30363D",
              background:"#0D1117", color:"white", fontSize:14, outline:"none" }} />
        )}
        <input value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email" type="email"
          style={{ padding:"12px 16px", borderRadius:8, border:"1px solid #30363D",
            background:"#0D1117", color:"white", fontSize:14, outline:"none" }} />
        <input value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" type="password"
          style={{ padding:"12px 16px", borderRadius:8, border:"1px solid #30363D",
            background:"#0D1117", color:"white", fontSize:14, outline:"none" }} />

        {error && (
          <p style={{ color:"#FF4757", fontSize:13, margin:0 }}>{error}</p>
        )}

        <button onClick={handleSubmit} disabled={loading}
          style={{
            padding:"14px", borderRadius:8, border:"none",
            background: loading ? "#00CC6A" : "#00FF87",
            color:"#0D1117", fontWeight:700, fontSize:15,
            letterSpacing:"0.1em", textTransform:"uppercase",
            cursor: loading ? "not-allowed" : "pointer",
          }}>
          {loading ? "CONNECTING..." : mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>
      </div>
    </div>
  );
}
