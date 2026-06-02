"use client";
import {
  createContext, useContext, useEffect,
  useState, ReactNode, useCallback
} from "react";
import { account, databases, DB_ID, COL, ID } from "@/lib/appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  loginGoogle: () => void;
  loginEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const u = await account.get();
      setUser(u as User);

      // Load profile
      try {
        const p = await databases.getDocument(DB_ID, COL.USERS, u.$id);
        setProfile(p);
      } catch {
        // Profile doesn't exist yet — that's fine
        setProfile(null);
      }
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth on every page load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser();
  }, [refreshUser]);

  function loginGoogle() {
    // Save current page to return after login
    if (typeof window !== "undefined") {
      sessionStorage.setItem("returnTo", window.location.pathname);
    }
    account.createOAuth2Session(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "google" as any,
      "http://localhost:3000/auth/callback",
      "http://localhost:3000/"
    );
  }

  async function loginEmail(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    await refreshUser();
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await loginEmail(email, password);
  }

  async function logout() {
    try {
      await account.deleteSession("current");
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      isLoggedIn: !!user,
      loginGoogle,
      loginEmail,
      register,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
