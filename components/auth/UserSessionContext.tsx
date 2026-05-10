"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "saien-auth-session-v1";

export type UserRole = "member" | "admin" | "super-admin";

export type UserSession = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isMember: boolean;
  memberLabel: string;
  memberType: string | null;
  avatarUrl: string;
  emailVerified: boolean;
};

type StoredAuthSession = {
  token: string | null;
  session: UserSession;
};

type UserSessionContextValue = {
  isHydrated: boolean;
  token: string | null;
  session: UserSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (auth: StoredAuthSession) => void;
  signOut: () => void;
  updateSession: (nextSession: UserSession) => void;
};

const UserSessionContext = createContext<UserSessionContextValue | undefined>(undefined);

const isAdminRole = (role: UserRole) => role === "admin" || role === "super-admin";

export function UserSessionProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawSession = window.localStorage.getItem(STORAGE_KEY);
      if (!rawSession) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(rawSession) as Partial<StoredAuthSession>;
      if (
        !parsed ||
        typeof parsed !== "object" ||
        !parsed.session ||
        !parsed.session.id ||
        !parsed.session.email
      ) {
        setToken(null);
        setSession(null);
      } else {
        setToken(parsed.token ?? null);
        setSession(parsed.session as UserSession);
      }
    } catch {
      setToken(null);
      setSession(null);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    if (!session) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token,
        session,
      }),
    );
  }, [isHydrated, token, session]);

  const contextValue = useMemo<UserSessionContextValue>(
    () => ({
      isHydrated,
      token,
      session,
      isAuthenticated: Boolean(session),
      isAdmin: Boolean(session && isAdminRole(session.role)),
      signIn: (auth) => {
        setToken(auth.token ?? null);
        setSession(auth.session);
      },
      signOut: () => {
        setToken(null);
        setSession(null);
      },
      updateSession: (nextSession) => setSession(nextSession),
    }),
    [isHydrated, token, session],
  );

  return (
    <UserSessionContext.Provider value={contextValue}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error("useUserSession must be used inside UserSessionProvider");
  }

  return context;
}
