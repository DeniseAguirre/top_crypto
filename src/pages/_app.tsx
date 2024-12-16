"use client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import BlurredBackground from "@/components/BlurredBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar la preferencia del sistema
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BlurredBackground isDarkMode={isDarkMode}>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex items-center">
        {router.pathname !== "/" && (
          <IconButton aria-label="back" size="large" onClick={handleBack}>
            <ArrowBack fontSize="inherit" className="dark:text-white" />
          </IconButton>
        )}
      </div>

      <Component {...pageProps} />

      <div className="p-4 flex justify-center">
        <a
          href="https://www.linkedin.com/in/denise-aguirre-m/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="dark:text-white text-black">
            Powered by{" "}
            <span className="multicolor-letter">Denise Aguirre Martinez</span>
          </p>
        </a>
      </div>
    </BlurredBackground>
  );
}

export default MyApp;
