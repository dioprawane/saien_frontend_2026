"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "saien-user-session-v1";

export type UserRole = "user" | "admin" | "super-admin";

export type UserSession = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isMember: boolean;
  memberLabel: string;
  avatarUrl: string;
};

type UserSessionContextValue = {
  isHydrated: boolean;
  session: UserSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signInAsMember: () => void;
  signInAsAdmin: () => void;
  signOut: () => void;
  updateSession: (nextSession: UserSession) => void;
};

const DEMO_MEMBER_SESSION: UserSession = {
  id: "USR-1001",
  fullName: "Jean Dupont",
  email: "jean.dupont@example.com",
  role: "user",
  isMember: true,
  memberLabel: "Membre Actif",
  avatarUrl: "/members/avatar-1.png",
};

const DEMO_ADMIN_SESSION: UserSession = {
  ...DEMO_MEMBER_SESSION,
  role: "super-admin",
};

const UserSessionContext = createContext<UserSessionContextValue | undefined>(undefined);

const isAdminRole = (role: UserRole) => role === "admin" || role === "super-admin";

export function UserSessionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawSession = window.localStorage.getItem(STORAGE_KEY);
      if (!rawSession) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(rawSession) as UserSession;
      if (!parsed || !parsed.id || !parsed.email) {
        setSession(null);
      } else {
        setSession(parsed);
      }
    } catch {
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

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [isHydrated, session]);

  useEffect(() => {
    if (!isHydrated) return;

    if (pathname.startsWith("/admin")) {
      setSession((previous) => {
        if (!previous) return DEMO_ADMIN_SESSION;
        if (isAdminRole(previous.role)) return previous;
        return {
          ...previous,
          role: "admin",
        };
      });
      return;
    }

    if (pathname.startsWith("/espace-membre")) {
      setSession((previous) => previous ?? DEMO_MEMBER_SESSION);
    }
  }, [isHydrated, pathname]);

  const contextValue = useMemo<UserSessionContextValue>(
    () => ({
      isHydrated,
      session,
      isAuthenticated: Boolean(session),
      isAdmin: Boolean(session && isAdminRole(session.role)),
      signInAsMember: () => setSession(DEMO_MEMBER_SESSION),
      signInAsAdmin: () => setSession(DEMO_ADMIN_SESSION),
      signOut: () => setSession(null),
      updateSession: (nextSession) => setSession(nextSession),
    }),
    [isHydrated, session],
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
