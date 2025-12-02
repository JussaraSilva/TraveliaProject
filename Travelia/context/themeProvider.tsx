// context/themeContext.tsx
import { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import  {useColorScheme}  from 'react-native';


type ThemeName = "light" | "dark";

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }:PropsWithChildren) {

  const systemColorScheme = useColorScheme();

  const [userTheme, setUserTheme] = useState<ThemeName>("light");

  // Adiciona um useEffect para garantir que o tema do sistema seja capturado assim que disponível
  useEffect(() => {
    if (systemColorScheme && userTheme === null) {
      setUserTheme(systemColorScheme);
    }
  }, [systemColorScheme, userTheme]);

  const toggleTheme = () => {
    setUserTheme(prevTheme => {
      // Lógica para alternar com segurança, mesmo se prevTheme for null
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'light';
      // Fallback: se for null, alterna com base no tema atual do sistema
      return systemColorScheme === 'light' ? 'dark' : 'light';
    });
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



