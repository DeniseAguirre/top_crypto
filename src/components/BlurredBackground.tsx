import React from "react";

interface BlurredBackgroundProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({
  children,
  isDarkMode,
}) => {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? "from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black"
              : "from-blue-200 to-purple-200"
          } opacity-75`}
        ></div>

        {/* Manchas de colores */}
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
            isDarkMode ? "bg-purple-700 dark:bg-purple-900" : "bg-pink-200"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ${
            isDarkMode ? "bg-yellow-700 dark:bg-yellow-900" : "bg-yellow-200"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${
            isDarkMode ? "bg-blue-700 dark:bg-blue-900" : "bg-green-200"
          }`}
        ></div>

        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BlurredBackground;
