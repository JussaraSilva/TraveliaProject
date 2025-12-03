import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider } from '@/context/themeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="_tabs" />
        <Stack.Screen name="_auth" />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
