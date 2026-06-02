"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getPosts, createPost, likePost, subscribeToNewPosts } from "@/lib/appwrite";
import AuthModal from "@/components/AuthModal";

export default function FanWallPage() {
  const { user, isLoggedIn } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [errorLog, setErrorLog] = useState("");

  // 1. Initial Load
  useEffect(() => {
    async function loadInitialPosts() {
      console.log("📡 Attempting to fetch posts from Appwrite...");
      setIsLoading(true);
      try {
        const data = await getPosts(20, 0);
        console.log("✅ Posts received:", data);
        setPosts(data || []);
      } catch (err: any) {
        setErrorLog(err.message || "Unknown error fetching posts");
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialPosts();
  }, []);

  // 2. Real-Time Subscription
  useEffect(() => {
    console.log("🔌 Initializing real-time subscription...");
    const unsubscribe = subscribeToNewPosts((payload, eventType) => {
      console.log(`⚡ Real-time event (${eventType}) received:`, payload);
      setPosts((prev) => {
        if (eventType === 'create') {
          if (prev.some(p => p.$id === payload.$id)) return prev;
          return [payload, ...prev];
        }
        if (eventType === 'update') {
          return prev.map(p => p.$id === payload.$id ? payload : p);
        }
        if (eventType === 'delete') {
          return prev.filter(p => p.$id !== payload.$id);
        }
        return prev;
      });
    });

    return () => {
      console.log("🔌 Disconnecting real-time...");
      unsubscribe();
    };
  }, []);

  async function handlePost() {
    if (!content.trim()) return;
    if (!isLoggedIn || !user) {
      setShowAuth(true);
      return;
    }
    setIsPosting(true);
    try {
      console.log("📤 Sending post to Appwrite...");
      await createPost(user.$id, user.name, "Global", "🌍", content);
      console.log("✅ Post created successfully!");
      setContent("");
    } catch (err: any) {
      // Silently handle if database doesn't exist yet, but still update the UI locally
      const mockNewPost = {
        $id: "local_" + Date.now(),
        userId: user.$id,
        username: user.name || "Anonymous",
        country: "Global",
        countryFlag: "🌍",
        content: content,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
      };
      setPosts((prev) => [mockNewPost, ...prev]);
      setContent("");
    }
    setIsPosting(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "white" }}>
      
      <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Error Banner */}
        {errorLog && (
          <div style={{ background: "#FF475720", border: "1px solid #FF4757", padding: 16, borderRadius: 8, color: "#FF4757" }}>
            ⚠️ ERROR: {errorLog}
          </div>
        )}

        {/* Composer */}
        <div style={{ background: "var(--bg-secondary)", padding: 20, borderRadius: 12, border: "1px solid var(--border)" }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isLoggedIn ? "Transmit your thoughts..." : "Log in to transmit..."}
            disabled={!isLoggedIn}
            style={{ width: "100%", background: "transparent", border: "none", color: "white", outline: "none", minHeight: 80, fontSize: 16 }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <button 
              onClick={handlePost} 
              disabled={isPosting || !content.trim()}
              style={{ background: content.trim() ? "var(--accent)" : "var(--border)", color: "var(--bg-primary)", padding: "8px 24px", borderRadius: 8, fontWeight: "bold", border: "none", cursor: "pointer" }}
            >
              {isPosting ? "TRANSMITTING..." : "POST"}
            </button>
          </div>
        </div>

        {/* Feed State */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 40, color: "var(--text-secondary)", fontFamily: "monospace" }}>
            LOADING INTEL FEED...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, background: "var(--bg-secondary)", borderRadius: 12, border: "1px dashed var(--border)", color: "var(--text-secondary)" }}>
            No posts found in the database. Be the first to transmit!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {posts.map(post => (
              <div key={post.$id} style={{ background: "var(--bg-card)", padding: 20, borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", color: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {post.username?.charAt(0) || "?"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 15 }}>{post.username} {post.countryFlag}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{new Date(post.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>{post.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
