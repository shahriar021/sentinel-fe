"use client";

import Drawer from "@/src/components/layout/Drawer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
}
