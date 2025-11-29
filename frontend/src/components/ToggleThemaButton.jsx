import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ToggleThemaButton() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-20 right-20 p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      {isDark ? (
        <FaSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FaMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}

export default ToggleThemaButton;
