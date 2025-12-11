import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider } from '@/context/themeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />   {/* ← deixa o router fazer o trabalho dele */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
