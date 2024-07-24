"use client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <div className="flex justify-end dark:bg-gray-900 bg-slate-200 dark:text-white text-black p-4">
        <DarkModeToggle />
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
