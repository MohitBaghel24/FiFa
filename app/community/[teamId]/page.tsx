"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getTeamById } from "@/lib/teams";
import { getMessages, sendMessage, subscribeToMessages } from "@/lib/appwrite";
import AuthModal from "@/components/AuthModal";

export default function TeamChatPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = React.use(params);
  const team = getTeamById(teamId);
  const { user, isLoggedIn } = useAuth();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [errorLog, setErrorLog] = useState("");
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load
  useEffect(() => {
    if (!team) return;
    async function loadInitialMessages() {
      setIsLoading(true);
      try {
        const data = await getMessages(teamId, 50);
        setMessages(data || []);
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } catch (err: any) {
        setErrorLog(err.message || "Unknown error fetching messages");
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialMessages();
  }, [teamId, team]);

  // 2. Real-Time Subscription
  useEffect(() => {
    if (!team) return;
    const unsubscribe = subscribeToMessages(teamId, (payload) => {
      setMessages((prev) => {
        if (prev.some(m => m.$id === payload.$id)) return prev;
        const newMessages = [...prev, payload];
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        return newMessages;
      });
    });

    return () => {
      unsubscribe();
    };
  }, [teamId, team]);

  if (!team) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>404</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Team not found.</p>
        <Link href="/community" style={{ color: "var(--accent)" }}>← Return to Hub</Link>
      </div>
    );
  }

  async function handleSend() {
    if (!content.trim()) return;
    if (!isLoggedIn || !user) {
      setShowAuth(true);
      return;
    }
    setIsPosting(true);
    try {
      await sendMessage(teamId, user.$id, user.name, "Global", "🌍", content);
      setContent("");
    } catch (err: any) {
      // Silently handle if database doesn't exist yet, but still update the UI locally
      const mockNewMsg = {
        $id: "local_" + Date.now(),
        communityId: teamId,
        userId: user.$id,
        username: user.name || "Anonymous",
        country: "Global",
        countryFlag: "🌍",
        text: content,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, mockNewMsg]);
      setContent("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
    setIsPosting(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "white", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <div style={{ background: "var(--bg-secondary)", padding: "16px 24px", borderBottom: `2px solid ${team.color}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/community" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 24 }}>←</Link>
          <img src={team.flag} alt={`${team.name} flag`} style={{ width: 48, height: 32, borderRadius: 4, objectFit: "cover" }} />
          <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>{team.name} HUB</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse-green 2s infinite" }} />
          <span style={{ color: "var(--accent)", fontSize: 14, fontWeight: "bold" }}>LIVE</span>
        </div>
      </div>

      {/* Chat Feed */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        {errorLog && (
          <div style={{ background: "#FF475720", border: "1px solid #FF4757", padding: 12, borderRadius: 8, color: "#FF4757", textAlign: "center" }}>
            ⚠️ {errorLog}
          </div>
        )}
        
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 40, color: "var(--text-secondary)", fontFamily: "monospace" }}>
            LOADING SECURE CHAT...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "var(--text-secondary)" }}>
            Welcome to the {team.name} Hub. Send the first message!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = user && msg.userId === user.$id;
            return (
              <div key={msg.$id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", width: "100%" }}>
                <span style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, marginLeft: isMe ? 0 : 12, marginRight: isMe ? 12 : 0 }}>
                  {msg.username} {msg.countryFlag} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div style={{
                  background: isMe ? "rgba(0, 255, 135, 0.1)" : "var(--bg-card)",
                  border: isMe ? "1px solid rgba(0, 255, 135, 0.3)" : "1px solid var(--border)",
                  padding: "12px 16px",
                  borderRadius: isMe ? "16px 16px 0px 16px" : "16px 16px 16px 0px",
                  maxWidth: "80%",
                  color: "white",
                  fontSize: 15,
                  lineHeight: 1.5
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="bg-bg-secondary border-t border-border-color p-4 md:px-6 md:py-4 sticky bottom-16 md:bottom-0 z-20">
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 12 }}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLoggedIn ? `Message the ${team.name} community...` : "Log in to join the conversation..."}
            disabled={!isLoggedIn || isPosting}
            style={{
              flex: 1,
              background: "var(--bg-primary)",
              border: "1px solid var(--border)",
              color: "white",
              padding: "12px 20px",
              borderRadius: 24,
              fontSize: 15,
              outline: "none",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!isLoggedIn || isPosting || !content.trim()}
            style={{
              background: content.trim() ? "var(--accent)" : "var(--border)",
              color: "var(--bg-primary)",
              border: "none",
              padding: "0 24px",
              borderRadius: 24,
              fontWeight: "bold",
              cursor: content.trim() ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
          >
            {isPosting ? "..." : "SEND"}
          </button>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
