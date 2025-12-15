import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated'; // MANTIDO: Necessário para o carrossel
import { ThemeProvider } from '@/context/themeProvider';
import { useState, useEffect } from 'react'; // NOVAS IMPORTAÇÕES

export default function RootLayout() {
  // 1. Cria um estado para rastrear se a primeira renderização já passou
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 2. O useEffect roda APÓS a primeira renderização.
    // Ele define o estado para true, o que aciona a segunda renderização segura.
    // Isso mitiga a race condition do reanimated.
    setIsReady(true);
  }, []);

  if (!isReady) {
    // 3. Na primeira renderização (rápida/problemática), retorna null.
    // Isso previne que a árvore de componentes completa (incluindo o reanimated) seja carregada 
    // antes que o ambiente esteja estável, evitando o erro da string solta.
    return null;
  }

  return (
    <ThemeProvider>
      <Slot /> 
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}