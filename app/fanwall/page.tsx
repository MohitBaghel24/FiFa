"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getPosts, createPost, likePost,
  subscribeToNewPosts
} from "@/lib/appwrite";
import AuthModal from "@/components/AuthModal";

export default function FanWallPage() {
  const { user, isLoggedIn } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts]       = useState<any[]>([]);
  const [content, setContent]   = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth]   = useState(false);
  const [offset, setOffset]       = useState(0);
  const [hasMore, setHasMore]     = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const MOCK_POSTS = [
    { $id:"m1", username:"Alex_Silva", country:"Brazil",
      countryFlag:"🇧🇷", content:"Vini Jr is absolutely tearing it up! 🔥",
      likes:124, comments:18,
      createdAt: new Date(Date.now()-120000).toISOString() },
    { $id:"m2", username:"James_T", country:"England",
      countryFlag:"🏴",
      content:"Need a tactical shift. Midfield is getting overrun.",
      likes:89, comments:45,
      createdAt: new Date(Date.now()-900000).toISOString() },
    { $id:"m3", username:"Sofia_R", country:"Italy",
      countryFlag:"🇮🇹",
      content:"Forza Azzurri! Electric atmosphere tonight! ⚡",
      likes:342, comments:56,
      createdAt: new Date(Date.now()-3600000).toISOString() },
  ];

  useEffect(() => {
    loadPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsub = subscribeToNewPosts((newPost: any) => {
      setPosts(prev => [newPost, ...prev]);
    });
    return () => unsub();
  }, []);

  async function loadPosts(reset = false) {
    setIsLoading(true);
    const newOffset = reset ? 0 : offset;
    const data = await getPosts(10, newOffset);
    if (data.length < 10) setHasMore(false);
    setPosts(prev => reset ? data : [...prev, ...data]);
    setOffset(newOffset + 10);
    setIsLoading(false);
  }

  async function handlePost() {
    if (!content.trim()) return;
    if (!isLoggedIn) { setShowAuth(true); return; }
    setIsPosting(true);
    try {
      await createPost(
        user.$id, user.name,
        "Global", "🌍", content
      );
      setContent("");
    } catch (e) {
      console.error(e);
    }
    setIsPosting(false);
  }

  async function handleLike(postId: string, likes: number) {
    if (likedPosts.has(postId)) return;
    await likePost(postId, likes);
    setLikedPosts(prev => new Set([...prev, postId]));
    setPosts(prev => prev.map(p =>
      p.$id === postId ? {...p, likes: likes+1} : p
    ));
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff/60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + "m ago";
    const hrs = Math.floor(mins/60);
    if (hrs < 24) return hrs + "h ago";
    return Math.floor(hrs/24) + "d ago";
  }

  const displayPosts = posts.length > 0 ? posts : MOCK_POSTS;

  return (
    <div style={{ minHeight:"100vh", background:"#0D1117" }}>
      <div style={{
        maxWidth:1200, margin:"0 auto",
        padding:"40px 24px",
        display:"grid",
        gridTemplateColumns:"1fr 320px",
        gap:32,
      }}>

        {/* Main feed */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Post composer */}
          <div style={{
            background:"#161B22", border:"1px solid #30363D",
            borderRadius:12, padding:20,
          }}>
            <div style={{ display:"flex", gap:12 }}>
              <div style={{
                width:44, height:44, borderRadius:"50%",
                background: isLoggedIn ? "#00FF87" : "#30363D",
                display:"flex", alignItems:"center",
                justifyContent:"center", color:"#0D1117",
                fontWeight:700, fontSize:16, flexShrink:0,
              }}>
                {isLoggedIn ? user?.name?.charAt(0)?.toUpperCase() : "?"}
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={isLoggedIn
                  ? "Share your thoughts on the match..."
                  : "Login to post your thoughts..."}
                disabled={!isLoggedIn}
                style={{
                  flex:1, background:"transparent",
                  border:"none", outline:"none",
                  color:"white", fontSize:15,
                  resize:"none", minHeight:80,
                  fontFamily:"inherit",
                }}
              />
            </div>
            <div style={{
              display:"flex", justifyContent:"flex-end",
              marginTop:12, borderTop:"1px solid #30363D",
              paddingTop:12,
            }}>
              <button onClick={handlePost} disabled={isPosting || !content.trim()}
                style={{
                  padding:"10px 28px", borderRadius:8,
                  background: content.trim() ? "#00FF87" : "#30363D",
                  color: content.trim() ? "#0D1117" : "#8B949E",
                  fontWeight:700, fontSize:13, border:"none",
                  letterSpacing:"0.1em", cursor:"pointer",
                  textTransform:"uppercase",
                }}>
                {isPosting ? "POSTING..." : "POST"}
              </button>
            </div>
          </div>

          {/* Posts */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {displayPosts.map((post: any) => (
            <div key={post.$id} style={{
              background:"#161B22", border:"1px solid #30363D",
              borderRadius:12, padding:20,
            }}>
              <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%",
                  background:"#1C2333", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  color:"white", fontWeight:700,
                  border:"1px solid #30363D", flexShrink:0,
                }}>
                  {post.username?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{
                      color:"white", fontWeight:600, fontSize:14
                    }}>
                      {post.username}
                    </span>
                    <span style={{ fontSize:16 }}>{post.countryFlag}</span>
                    <span style={{ color:"#8B949E", fontSize:12 }}>
                      @{post.username?.toLowerCase()?.replace(" ","_")}
                    </span>
                    <span style={{ color:"#484F58", fontSize:12 }}>
                      • {timeAgo(post.createdAt)}
                    </span>
                  </div>
                  <span style={{
                    color:"#00FF87", fontSize:11, letterSpacing:"0.06em"
                  }}>
                    {post.country?.toUpperCase()}
                  </span>
                </div>
              </div>

              <p style={{
                color:"#E6EDF3", fontSize:15, lineHeight:1.6,
                margin:"0 0 16px",
              }}>
                {post.content}
              </p>

              <div style={{ display:"flex", gap:20 }}>
                <button
                  onClick={() => handleLike(post.$id, post.likes)}
                  style={{
                    background:"none", border:"none",
                    color: likedPosts.has(post.$id) ? "#00FF87" : "#8B949E",
                    cursor:"pointer", fontSize:13,
                    display:"flex", alignItems:"center", gap:6,
                  }}>
                  👍 {post.likes || 0}
                </button>
                <span style={{
                  color:"#8B949E", fontSize:13,
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  💬 {post.comments || 0}
                </span>
                <span style={{
                  color:"#8B949E", fontSize:13,
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  🔗 Share
                </span>
              </div>
            </div>
          ))}

          {/* Load more */}
          {hasMore && (
            <button onClick={() => loadPosts()}
              disabled={isLoading}
              style={{
                padding:"14px", borderRadius:8,
                border:"1px solid #30363D", background:"transparent",
                color:"#8B949E", fontSize:13, cursor:"pointer",
                letterSpacing:"0.08em",
              }}>
              {isLoading ? "LOADING..." : "LOAD MORE POSTS"}
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Trending */}
          <div style={{
            background:"#161B22", border:"1px solid #30363D",
            borderRadius:12, padding:20,
          }}>
            <h3 style={{
              color:"white", fontSize:14, fontWeight:700,
              letterSpacing:"0.1em", margin:"0 0 16px",
              textTransform:"uppercase",
              display:"flex", alignItems:"center", gap:8,
            }}>
              📈 TRENDING
            </h3>
            {[
              { tag:"#WorldCupFinal", posts:"124K" },
              { tag:"#ViniJrGoal", posts:"89K" },
              { tag:"#TacticalAnalysis", posts:"45K" },
              { tag:"#EuroNations", posts:"32K" },
              { tag:"#RefereeDecision", posts:"28K" },
            ].map(t => (
              <div key={t.tag} style={{
                display:"flex", justifyContent:"space-between",
                padding:"10px 0", borderBottom:"1px solid #30363D",
              }}>
                <span style={{ color:"#00FF87", fontSize:13 }}>{t.tag}</span>
                <span style={{ color:"#8B949E", fontSize:12 }}>{t.posts}</span>
              </div>
            ))}
          </div>

          {/* Login CTA if not logged in */}
          {!isLoggedIn && (
            <div style={{
              background:"rgba(0,255,135,0.05)",
              border:"1px solid rgba(0,255,135,0.2)",
              borderRadius:12, padding:20, textAlign:"center",
            }}>
              <p style={{ color:"white", fontSize:14, margin:"0 0 12px" }}>
                Join the conversation
              </p>
              <button onClick={() => setShowAuth(true)}
                style={{
                  width:"100%", padding:"10px",
                  background:"#00FF87", color:"#0D1117",
                  border:"none", borderRadius:8,
                  fontWeight:700, cursor:"pointer",
                  letterSpacing:"0.08em",
                }}>
                LOGIN TO POST
              </button>
            </div>
          )}
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
