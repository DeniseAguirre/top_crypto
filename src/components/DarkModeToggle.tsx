"use client";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );

    setDarkMode(initialColorValue === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 dark:text-white">
      {darkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9 20q3.325 0 5.663-2.337T17 12t-2.337-5.663T9 4h-.525q-.25 0-.475.05q1.425 1.65 2.213 3.688T11 12t-.788 4.263T8 19.95q.225.05.475.05zm0 1q-.439 0-.878-.05q-.44-.05-.855-.17q-.255-.067-.411-.28t-.156-.471q0-.156.052-.294q.052-.139.175-.25q1.462-1.53 2.267-3.452Q10 14.109 10 12t-.818-4.02q-.818-1.91-2.26-3.446q-.118-.111-.17-.25Q6.7 4.147 6.7 3.99q0-.28.153-.492t.409-.279q.42-.119.86-.169Q8.56 3 9 3q1.868 0 3.51.708t2.858 1.923t1.923 2.857t.709 3.509t-.709 3.51q-.708 1.643-1.923 2.859t-2.858 1.925T9 21m2-9"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.23 12q0 .214-.143.357t-.356.143h-4q-.213 0-.356-.144t-.144-.357t.144-.356t.356-.143h4q.212 0 .356.144t.144.357m1.373-3.397q-.16.16-.354.16t-.354-.16L6.812 7.519q-.14-.14-.15-.344t.15-.363t.354-.16t.353.16l1.085 1.084q.14.14.15.345q.01.203-.15.363M11.5 6.73v-4q0-.213.144-.356t.357-.144t.356.144t.143.356v4q0 .212-.144.356t-.357.144t-.356-.144t-.143-.356m3.896 1.873q-.16-.16-.16-.354t.16-.354l1.085-1.084q.14-.14.344-.15t.364.15t.159.354t-.16.353l-1.084 1.085q-.14.14-.345.15q-.203.01-.363-.15m1.373 3.395q0-.212.144-.356t.356-.143h4q.213 0 .356.144t.144.357t-.144.356t-.356.143h-4q-.212 0-.356-.144t-.144-.357M12 14q-.846 0-1.423-.577T10 12t.577-1.423T12 10t1.423.577T14 12t-.577 1.423T12 14m3.396 1.396q.16-.16.354-.16t.354.16l1.085 1.085q.14.14.15.344t-.15.364t-.354.159t-.354-.16l-1.085-1.084q-.14-.14-.15-.345q-.01-.203.15-.363m-6.792 0q.16.16.16.354t-.16.354l-1.085 1.084q-.14.14-.344.15t-.363-.15t-.16-.354t.16-.353l1.084-1.085q.14-.14.345-.15q.203-.01.363.15M12 16.77q.213 0 .356.144t.143.356v4q0 .213-.144.356t-.357.144t-.356-.144t-.143-.356v-4q0-.212.144-.356T12 16.77"
          />
        </svg>
      )}
    </button>
  );
}
