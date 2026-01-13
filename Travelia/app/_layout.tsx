import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated'; 
import { ThemeProvider } from '@/context/themeProvider';
import { TravelerProvider } from '@/context/traveler/travelerContext'; // ADICIONE ISSO
import { useState, useEffect } from 'react'; 
import { testStorage } from '@/services/testAsync';
import { BookingProvider } from '@/context/booking/bookingContext';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    testStorage();
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider>
      {/* O TravelerProvider envolve o Slot para que todas as rotas tenham acesso */}
      <TravelerProvider>
        <BookingProvider>
          <Slot /> 
          <StatusBar style="auto" />
        </BookingProvider>
      </TravelerProvider>
    </ThemeProvider>
  );
}