import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

// The initial value is set by an inline script in index.html to avoid a flash.
const readTheme = () =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fafaf9" : "#0b0d12");
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
