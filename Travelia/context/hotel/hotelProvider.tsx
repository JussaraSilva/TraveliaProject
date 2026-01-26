
import { PacoteHotel } from '@/assets/types/accomodationType';
import { hoteis } from '@/assets/data/accomodationData.json';


import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

interface HotelContextData {
  
  hotelSelecionado: PacoteHotel | null;
  setHotelById: (id: number) => void;
  limparHotel: () => void;
}
const HotelContext = createContext<HotelContextData>(
  {} as HotelContextData
);

export function HotelProvider({ children }: { children: ReactNode }) {
  const [hotelSelecionado, setHotelSelecionado] =
    useState<PacoteHotel | null>(null);

  const setHotelById = useCallback((id: number) => {
    const hotel = hoteis.find(h => h.id === id) ?? null;
    setHotelSelecionado(hotel);
  }, []);

  const limparHotel = useCallback(() => {
    setHotelSelecionado(null);
  }, []);

  return (
    <HotelContext.Provider
      value={{ hotelSelecionado, setHotelById, limparHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}



