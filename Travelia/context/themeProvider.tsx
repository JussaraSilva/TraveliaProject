// context/themeProvider.tsx
import { createContext, useContext, useState, PropsWithChildren } from "react";
import { useColorScheme } from "react-native";

// 👇 importa o tipo ThemeName e as cores do mesmo arquivo pra ficar tudo consistente
import { ThemeName } from "@/constants/theme";

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme(); // "light" | "dark" | null | undefined

  // 👇 aqui o TS garante que SEMPRE será "light" ou "dark"
  const initialTheme: ThemeName =
    systemColorScheme === "dark" ? "dark" : "light";

  const [userTheme, setUserTheme] = useState<ThemeName>(initialTheme);

  // 👇 toggle simples e 100% typesafe
  const toggleTheme = () => {
    setUserTheme(prev =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: userTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
