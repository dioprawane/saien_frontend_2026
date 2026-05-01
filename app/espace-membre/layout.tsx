import type { ReactNode } from "react";
import MemberHeader from "@/components/member/MemberHeader";
import MemberFooter from "@/components/member/MemberFooter";

export default function EspaceMembreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f5]">
      <MemberHeader />
      <main className="flex-1">{children}</main>
      <MemberFooter />
    </div>
  );
}
