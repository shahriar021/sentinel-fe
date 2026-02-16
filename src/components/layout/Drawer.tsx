"use client";

import { useState } from "react";
import Link from "next/link";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function Drawer() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed top-4 left-4 z-10 bg-background text-foreground px-4 py-2 rounded-lg ">
        <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
      </button>

      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

      <div
        className={`fixed top-16 left-0 h-full w-64 bg-background text-foreground shadow-lg z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-xl">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-red-500">
            Close
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-2">
          <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded">
            Dashboard
          </Link>
          <Link href="/profile" className="px-4 py-2 hover:bg-gray-100 rounded">
            Profile
          </Link>
          <Link href="/settings" className="px-4 py-2 hover:bg-gray-100 rounded">
            Settings
          </Link>
        </nav>
      </div>
    </>
  );
}
