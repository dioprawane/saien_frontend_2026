"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "saien-admin-console-v1";

export type RegistrationStatus = "pending" | "approved" | "rejected";
export type MemberType = "active" | "adherent" | "honor" | "benefactor";
export type MemberStatus = "active" | "suspended";
export type AdminRole = "member" | "admin" | "super-admin" | "admin-event";
export type EventFormat = "onsite" | "online" | "hybrid";
export type EventStatus = "draft" | "published" | "completed" | "cancelled";

export type AdminRegistration = {
  id: string;
  fullName: string;
  email: string;
  type: MemberType;
  source: "website" | "event" | "referral";
  submittedAt: string;
  status: RegistrationStatus;
  reviewer?: string;
  reviewedAt?: string;
  note?: string;
};

export type AdminMember = {
  id: string;
  fullName: string;
  email: string;
  type: MemberType;
  status: MemberStatus;
  role: AdminRole;
  city: string;
  joinedAt: string;
  lastPaymentAt: string;
  avatarSeed: number;
};

export type AdminEvent = {
  id: string;
  title: string;
  format: EventFormat;
  startDate: string;
  location: string;
  capacity: number;
  registrations: number;
  owner: string;
  status: EventStatus;
};

export type AdminSettings = {
  organizationName: string;
  supportEmail: string;
  defaultMemberType: MemberType;
  autoApproval: boolean;
  paymentReviewRequired: boolean;
  notifyOnNewRegistration: boolean;
  notifyOnEventThreshold: boolean;
  memberCardVerificationEnabled: boolean;
};

type AdminSummary = {
  totalMembers: number;
  activeMembers: number;
  suspendedMembers: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
  publishedEvents: number;
};

type CreateMemberInput = {
  fullName: string;
  email: string;
  type: MemberType;
  city: string;
  role?: AdminRole;
};

type CreateEventInput = {
  title: string;
  format: EventFormat;
  startDate: string;
  location: string;
  capacity: number;
  owner: string;
};

type AdminContextValue = {
  isHydrated: boolean;
  registrations: AdminRegistration[];
  members: AdminMember[];
  events: AdminEvent[];
  settings: AdminSettings;
  summary: AdminSummary;
  approveRegistration: (registrationId: string, reviewer?: string, note?: string) => void;
  rejectRegistration: (registrationId: string, reviewer?: string, note?: string) => void;
  setRegistrationPending: (registrationId: string) => void;
  bulkSetRegistrationStatus: (registrationIds: string[], status: RegistrationStatus) => void;
  deleteRegistration: (registrationId: string) => void;
  createMember: (payload: CreateMemberInput) => void;
  updateMemberStatus: (memberId: string, status: MemberStatus) => void;
  updateMemberType: (memberId: string, type: MemberType) => void;
  updateMemberRole: (memberId: string, role: AdminRole) => void;
  removeMember: (memberId: string) => void;
  createEvent: (payload: CreateEventInput) => void;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  updateEventRegistrations: (eventId: string, registrations: number) => void;
  saveSettings: (payload: Partial<AdminSettings>) => void;
  resetAdminData: () => void;
};

type PersistedState = {
  registrations: AdminRegistration[];
  members: AdminMember[];
  events: AdminEvent[];
  settings: AdminSettings;
};

const initialRegistrations = (): AdminRegistration[] => [
  {
    id: "REG-001",
    fullName: "Amadou Diallo",
    email: "amadou.d@example.com",
    type: "active",
    source: "website",
    submittedAt: "2026-04-27T11:10:00.000Z",
    status: "pending",
  },
  {
    id: "REG-002",
    fullName: "Sarah Kouassi",
    email: "sarah.k@example.com",
    type: "benefactor",
    source: "referral",
    submittedAt: "2026-04-25T09:15:00.000Z",
    status: "approved",
    reviewer: "Jean Dupont",
    reviewedAt: "2026-04-25T16:30:00.000Z",
  },
  {
    id: "REG-003",
    fullName: "Marc Laurent",
    email: "m.laurent@tech.org",
    type: "active",
    source: "event",
    submittedAt: "2026-04-24T14:52:00.000Z",
    status: "pending",
  },
  {
    id: "REG-004",
    fullName: "Chloe Dubois",
    email: "chloe.d@example.com",
    type: "adherent",
    source: "website",
    submittedAt: "2026-04-23T08:20:00.000Z",
    status: "rejected",
    reviewer: "Jean Dupont",
    reviewedAt: "2026-04-23T17:00:00.000Z",
    note: "Dossier incomplet",
  },
  {
    id: "REG-005",
    fullName: "Ibrahima Sarr",
    email: "isarr@example.com",
    type: "honor",
    source: "referral",
    submittedAt: "2026-04-21T12:10:00.000Z",
    status: "pending",
  },
  {
    id: "REG-006",
    fullName: "Awa Fall",
    email: "awa.fall@example.com",
    type: "adherent",
    source: "website",
    submittedAt: "2026-04-20T10:05:00.000Z",
    status: "approved",
    reviewer: "Jean Dupont",
    reviewedAt: "2026-04-20T15:25:00.000Z",
  },
];

const initialMembers = (): AdminMember[] => [
  {
    id: "MBR-1001",
    fullName: "Jean Dupont",
    email: "jean.dupont@example.com",
    type: "active",
    status: "active",
    role: "super-admin",
    city: "Paris",
    joinedAt: "2023-01-10T00:00:00.000Z",
    lastPaymentAt: "2026-01-12T00:00:00.000Z",
    avatarSeed: 11,
  },
  {
    id: "MBR-1002",
    fullName: "Fatou Ndiaye",
    email: "fatou.ndiaye@example.com",
    type: "active",
    status: "active",
    role: "admin",
    city: "Dakar",
    joinedAt: "2024-03-18T00:00:00.000Z",
    lastPaymentAt: "2026-02-03T00:00:00.000Z",
    avatarSeed: 25,
  },
  {
    id: "MBR-1003",
    fullName: "Mouhamed Ba",
    email: "mouhamed.ba@example.com",
    type: "adherent",
    status: "active",
    role: "member",
    city: "Lyon",
    joinedAt: "2024-07-09T00:00:00.000Z",
    lastPaymentAt: "2025-12-14T00:00:00.000Z",
    avatarSeed: 30,
  },
  {
    id: "MBR-1004",
    fullName: "Marieme Cisse",
    email: "marieme.cisse@example.com",
    type: "benefactor",
    status: "active",
    role: "member",
    city: "Montreal",
    joinedAt: "2022-11-25T00:00:00.000Z",
    lastPaymentAt: "2026-01-06T00:00:00.000Z",
    avatarSeed: 44,
  },
  {
    id: "MBR-1005",
    fullName: "Bamba Ka",
    email: "bamba.ka@example.com",
    type: "honor",
    status: "suspended",
    role: "member",
    city: "Abidjan",
    joinedAt: "2021-05-03T00:00:00.000Z",
    lastPaymentAt: "2024-12-21T00:00:00.000Z",
    avatarSeed: 51,
  },
];

const initialEvents = (): AdminEvent[] => [
  {
    id: "EVT-001",
    title: "AI Leaders Roundtable",
    format: "hybrid",
    startDate: "2026-05-08T17:30:00.000Z",
    location: "Paris + Zoom",
    capacity: 180,
    registrations: 143,
    owner: "Fatou Ndiaye",
    status: "published",
  },
  {
    id: "EVT-002",
    title: "Mentorat Data Science",
    format: "online",
    startDate: "2026-05-22T18:00:00.000Z",
    location: "Zoom",
    capacity: 250,
    registrations: 98,
    owner: "Jean Dupont",
    status: "published",
  },
  {
    id: "EVT-003",
    title: "Hackathon SAIEN Campus",
    format: "onsite",
    startDate: "2026-06-15T09:00:00.000Z",
    location: "Dakar",
    capacity: 120,
    registrations: 74,
    owner: "Marieme Cisse",
    status: "draft",
  },
  {
    id: "EVT-004",
    title: "Webinaire IA Generative",
    format: "online",
    startDate: "2026-04-15T17:00:00.000Z",
    location: "Google Meet",
    capacity: 400,
    registrations: 390,
    owner: "Fatou Ndiaye",
    status: "completed",
  },
];

const initialSettings = (): AdminSettings => ({
  organizationName: "SAIEN Network",
  supportEmail: "contact@saien-network.org",
  defaultMemberType: "active",
  autoApproval: false,
  paymentReviewRequired: true,
  notifyOnNewRegistration: true,
  notifyOnEventThreshold: true,
  memberCardVerificationEnabled: true,
});

const createInitialState = (): PersistedState => ({
  registrations: initialRegistrations(),
  members: initialMembers(),
  events: initialEvents(),
  settings: initialSettings(),
});

const createContextId = (prefix: string) => {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${random}`;
};

const toIsoNow = () => new Date().toISOString();

const buildMemberFromRegistration = (registration: AdminRegistration): AdminMember => ({
  id: createContextId("MBR"),
  fullName: registration.fullName,
  email: registration.email,
  type: registration.type,
  status: "active",
  role: "member",
  city: "Non renseignee",
  joinedAt: toIsoNow(),
  lastPaymentAt: toIsoNow(),
  avatarSeed: Math.floor(Math.random() * 70) + 1,
});

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>(() => initialRegistrations());
  const [members, setMembers] = useState<AdminMember[]>(() => initialMembers());
  const [events, setEvents] = useState<AdminEvent[]>(() => initialEvents());
  const [settings, setSettings] = useState<AdminSettings>(() => initialSettings());

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<PersistedState>;

      if (parsed.registrations) setRegistrations(parsed.registrations);
      if (parsed.members) setMembers(parsed.members);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.settings) setSettings(parsed.settings);
    } catch {
      const fallback = createInitialState();
      setRegistrations(fallback.registrations);
      setMembers(fallback.members);
      setEvents(fallback.events);
      setSettings(fallback.settings);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const payload: PersistedState = {
      registrations,
      members,
      events,
      settings,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [isHydrated, registrations, members, events, settings]);

  const approveRegistration = (registrationId: string, reviewer = "Admin", note?: string) => {
    setRegistrations((prev) => {
      const target = prev.find((registration) => registration.id === registrationId);
      if (!target) return prev;

      setMembers((currentMembers) => {
        const alreadyMember = currentMembers.some(
          (member) => member.email.toLowerCase() === target.email.toLowerCase(),
        );
        if (alreadyMember) return currentMembers;
        return [buildMemberFromRegistration(target), ...currentMembers];
      });

      return prev.map((registration) =>
        registration.id === registrationId
          ? {
              ...registration,
              status: "approved",
              reviewer,
              reviewedAt: toIsoNow(),
              note,
            }
          : registration,
      );
    });
  };

  const rejectRegistration = (registrationId: string, reviewer = "Admin", note?: string) => {
    setRegistrations((prev) =>
      prev.map((registration) =>
        registration.id === registrationId
          ? {
              ...registration,
              status: "rejected",
              reviewer,
              reviewedAt: toIsoNow(),
              note,
            }
          : registration,
      ),
    );
  };

  const setRegistrationPending = (registrationId: string) => {
    setRegistrations((prev) =>
      prev.map((registration) =>
        registration.id === registrationId
          ? {
              ...registration,
              status: "pending",
              reviewer: undefined,
              reviewedAt: undefined,
              note: undefined,
            }
          : registration,
      ),
    );
  };

  const bulkSetRegistrationStatus = (registrationIds: string[], status: RegistrationStatus) => {
    if (registrationIds.length === 0) return;

    if (status === "approved") {
      registrationIds.forEach((registrationId) => approveRegistration(registrationId));
      return;
    }

    if (status === "rejected") {
      registrationIds.forEach((registrationId) => rejectRegistration(registrationId));
      return;
    }

    registrationIds.forEach((registrationId) => setRegistrationPending(registrationId));
  };

  const deleteRegistration = (registrationId: string) => {
    setRegistrations((prev) => prev.filter((registration) => registration.id !== registrationId));
  };

  const createMember = ({ fullName, email, type, city, role = "member" }: CreateMemberInput) => {
    const normalizedEmail = email.trim().toLowerCase();

    setMembers((prev) => {
      const exists = prev.some((member) => member.email.toLowerCase() === normalizedEmail);
      if (exists) return prev;

      const nextMember: AdminMember = {
        id: createContextId("MBR"),
        fullName: fullName.trim(),
        email: normalizedEmail,
        type,
        status: "active",
        role,
        city: city.trim() || "Non renseignee",
        joinedAt: toIsoNow(),
        lastPaymentAt: toIsoNow(),
        avatarSeed: Math.floor(Math.random() * 70) + 1,
      };

      return [nextMember, ...prev];
    });
  };

  const updateMemberStatus = (memberId: string, status: MemberStatus) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status,
            }
          : member,
      ),
    );
  };

  const updateMemberType = (memberId: string, type: MemberType) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              type,
            }
          : member,
      ),
    );
  };

  const updateMemberRole = (memberId: string, role: AdminRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              role,
            }
          : member,
      ),
    );
  };

  const removeMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const createEvent = ({ title, format, startDate, location, capacity, owner }: CreateEventInput) => {
    const nextEvent: AdminEvent = {
      id: createContextId("EVT"),
      title: title.trim(),
      format,
      startDate,
      location: location.trim(),
      capacity,
      registrations: 0,
      owner: owner.trim(),
      status: "draft",
    };

    setEvents((prev) => [nextEvent, ...prev]);
  };

  const updateEventStatus = (eventId: string, status: EventStatus) => {
    setEvents((prev) =>
      prev.map((eventItem) =>
        eventItem.id === eventId
          ? {
              ...eventItem,
              status,
            }
          : eventItem,
      ),
    );
  };

  const updateEventRegistrations = (eventId: string, registrationsCount: number) => {
    setEvents((prev) =>
      prev.map((eventItem) => {
        if (eventItem.id !== eventId) return eventItem;
        const bounded = Math.max(0, Math.min(registrationsCount, eventItem.capacity));
        return {
          ...eventItem,
          registrations: bounded,
        };
      }),
    );
  };

  const saveSettings = (payload: Partial<AdminSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...payload,
    }));
  };

  const resetAdminData = () => {
    const fallback = createInitialState();
    setRegistrations(fallback.registrations);
    setMembers(fallback.members);
    setEvents(fallback.events);
    setSettings(fallback.settings);
  };

  const summary = useMemo<AdminSummary>(() => {
    const activeMembers = members.filter((member) => member.status === "active").length;
    const suspendedMembers = members.filter((member) => member.status === "suspended").length;
    const pendingRegistrations = registrations.filter(
      (registration) => registration.status === "pending",
    ).length;
    const approvedRegistrations = registrations.filter(
      (registration) => registration.status === "approved",
    ).length;
    const rejectedRegistrations = registrations.filter(
      (registration) => registration.status === "rejected",
    ).length;
    const publishedEvents = events.filter((eventItem) => eventItem.status === "published").length;

    return {
      totalMembers: members.length,
      activeMembers,
      suspendedMembers,
      pendingRegistrations,
      approvedRegistrations,
      rejectedRegistrations,
      publishedEvents,
    };
  }, [members, registrations, events]);

  const contextValue: AdminContextValue = {
    isHydrated,
    registrations,
    members,
    events,
    settings,
    summary,
    approveRegistration,
    rejectRegistration,
    setRegistrationPending,
    bulkSetRegistrationStatus,
    deleteRegistration,
    createMember,
    updateMemberStatus,
    updateMemberType,
    updateMemberRole,
    removeMember,
    createEvent,
    updateEventStatus,
    updateEventRegistrations,
    saveSettings,
    resetAdminData,
  };

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
}

export function useAdminContext() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminContext must be used inside AdminProvider");
  }

  return context;
}
