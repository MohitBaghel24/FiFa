"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  getCurrentUser, loginWithGoogle,
  loginWithEmail, registerUser,
  logoutUser, createUserProfile, getUserProfile
} from "@/lib/appwrite";

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  loginGoogle: () => void;
  loginEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user,      setUser]      = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile,   setProfile]   = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setIsLoading(true);
    const u = await getCurrentUser();
    setUser(u);
    if (u) {
      const p = await getUserProfile(u.$id);
      if (!p) {
        const newP = await createUserProfile(
          u.$id, u.name, u.email
        );
        setProfile(newP);
      } else {
        setProfile(p);
      }
    }
    setIsLoading(false);
  }

  async function loginEmail(email: string, password: string) {
    await loginWithEmail(email, password);
    await checkUser();
  }

  async function register(email: string, password: string, name: string) {
    await registerUser(email, password, name);
    await checkUser();
  }

  async function logout() {
    await logoutUser();
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{
      user, profile, isLoading,
      isLoggedIn: !!user,
      loginGoogle: loginWithGoogle,
      loginEmail: loginEmail,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
