import { StyleSheet, Text, View } from 'react-native';

// Importe suas cores e o hook useTheme
import { themeColors } from '@/constants/theme'; 
import { ThemedButton } from '@/components/buttons/themedButton';
import { useTheme } from '../../context/themeProvider'; // Verifique se o caminho está correto
import { router} from 'expo-router';

// --- 1. MOVA O COMPONENTE DO BOTÃO PARA FORA DO HOMESCREEN ---

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();


  return (

      <ThemedButton 
        title="Change Theme" // Passe a string dinâmica para a prop title
        onPress={toggleTheme} // Passe a função para onPress
      />
    
  );
}

function handleLogin () {
  router.navigate('/stacks/login');
}


// --- 2. SEU COMPONENTE PRINCIPAL HOMESCREEN ---

export default function HomeScreen() {
  // Você pode usar useThemeColor aqui para o background da View se quiser que o fundo mude com o tema
  const { theme } = useTheme(); 
  const currentBackground = themeColors[theme].background;

  return (
    <View style={[styles.container, { backgroundColor: currentBackground }]}>
      <Text>Home</Text>
      
      {/* Renderize o novo componente do botão aqui */}
      <ThemeToggleButton /> 

      <ThemedButton 
        title="Login" // Passe a string dinâmica para a prop title
        onPress={handleLogin} // Passe a função para onPress
      />

    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
    flex: 1,
    // Remova backgroundColor estático daqui e use o estilo inline acima
  },
  
});
