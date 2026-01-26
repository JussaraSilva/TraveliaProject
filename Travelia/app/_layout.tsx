import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider } from '@/context/themeProvider';
import { TravelerProvider } from '@/context/traveler/travelerContext';
import { BookingProvider } from '@/context/booking/bookingContext';
import { HotelProvider } from '@/context/hotel/hotelProvider';

import { useState, useEffect } from 'react';
import { testStorage } from '@/services/testAsync';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    testStorage();
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider>
      <TravelerProvider>
        <BookingProvider>
          <HotelProvider>
            <Slot />
            <StatusBar style="auto" />
          </HotelProvider>
        </BookingProvider>
      </TravelerProvider>
    </ThemeProvider>
  );
}
