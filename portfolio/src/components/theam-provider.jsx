import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
});

// ThemeProvider component
export const ThemeProvider = ({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) => {
  // State to hold the current theme
  const [theme, setTheme] = useState(() => {
    // Get the stored theme from localStorage or use the default
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");

    // Apply the current theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Value provided to the context
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

// Custom hook to use the ThemeProvider
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
