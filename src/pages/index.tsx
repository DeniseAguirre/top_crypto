"use client";
import { useState } from "react";
import CryptoTable from "../components/CryptoTable";
import { formatDate } from "@/utils/formatDate";

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col px-24 py-8 dark:bg-gray-900 bg-slate-200 dark:text-white text-black">
      <h1 className="text-4xl font-light mb-2">Top 10 Criptomonedas</h1>
      <div className="mb-4">
        <div className="text-sm font-thin">
          {lastUpdated
            ? `Last update time: ${formatDate(lastUpdated)}`
            : "Loading..."}
        </div>
      </div>
      <CryptoTable lastUpdated={lastUpdated} setLastUpdated={setLastUpdated} />
    </main>
  );
}
