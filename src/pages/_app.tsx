"use client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={inter.className}>
      <div className="flex justify-between dark:bg-gray-900 bg-slate-200 dark:text-white text-black p-4">
        <div className="flex items-center">
          {router.pathname !== "/" && (
            <IconButton aria-label="back" size="large" onClick={handleBack}>
              <ArrowBack fontSize="inherit" className="dark:text-white" />
            </IconButton>
          )}
        </div>

        <DarkModeToggle />
      </div>
      <Component {...pageProps} />

      <div className="p-4 flex justify-center">
        <p>
          Powered by{" "}
          <span className="multicolor-letter">Denise Aguirre Martinez</span>
        </p>
      </div>
    </div>
  );
}

export default MyApp;
