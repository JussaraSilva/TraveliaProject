import React from 'react';

// Importe suas cores e o hook useTheme
import { themeColors } from '@/constants/theme'; 
import { ThemedButton } from '@/components/buttons/themedButton';
import { useTheme } from '../../context/themeProvider'; // Verifique se o caminho está correto



function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();


  return (

      <ThemedButton 
        title="Change Theme" // Passe a string dinâmica para a prop title
        onPress={toggleTheme} // Passe a função para onPress
        
      />
    
  );
}

export default ThemeToggleButton;