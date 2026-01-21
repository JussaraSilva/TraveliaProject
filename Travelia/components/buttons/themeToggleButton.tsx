import React from 'react';

// Importe suas cores e o hook useTheme
import { ButtonGlobal } from '@/components/buttons/buttonGlobal';
import { useTheme } from '../../context/themeProvider'; // Verifique se o caminho está correto



function ThemeToggleButton() {
  const { toggleTheme } = useTheme();


  return (

      <ButtonGlobal 
        title="Change Theme" // Passe a string dinâmica para a prop title
        onPress={toggleTheme} // Passe a função para onPress
        
      />
    
  );
}

export default ThemeToggleButton;