"use client";
import { useState } from "react";
import CryptoTable from "./components/CryptoTable";
import { formatDate } from "@/utils/formatDate";
import DarkModeToggle from "./components/DarkModeToggle";

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col p-24 dark:bg-gray-900 bg-slate-200 dark:text-white text-black">
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-2">Top 10 Criptomonedas</h1>
      <div className="mb-4">
        <div className="text-sm">
          {lastUpdated
            ? `Last update time: ${formatDate(lastUpdated)}`
            : "Loading..."}
        </div>
      </div>
      <CryptoTable lastUpdated={lastUpdated} setLastUpdated={setLastUpdated} />
    </main>
  );
}
