"use client";
import { useState } from "react";
import CryptoTable from "../components/CryptoTable";
import { formatDate } from "@/utils/formatDate";

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  return (
    <main className="flex min-h-screen flex-col px-6 lg:px-24 py-8 dark:text-white text-black">
      <div className="mb-4">
        <h1 className="text-4xl font-light mb-2">Top 10 Cryptocurrencies</h1>
        <div className="mb-4">
          <div className="text-sm font-thin">
            {lastUpdated
              ? `Last update time: ${formatDate(lastUpdated)}`
              : "Loading..."}
          </div>
        </div>
      </div>
      <CryptoTable lastUpdated={lastUpdated} setLastUpdated={setLastUpdated} />
    </main>
  );
}
