import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

// The initial value is set by an inline script in index.html to avoid a flash.
const readTheme = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f3efe6" : "#12110e");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
