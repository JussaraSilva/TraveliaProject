
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
  getHotelById: (id: number) => PacoteHotel | null;
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

  const getHotelById = useCallback((id: number) => {
    return hoteis.find(h => h.id === id) ?? null;
  }, []);

  const limparHotel = useCallback(() => {
    setHotelSelecionado(null);
  }, []);

  return (
    <HotelContext.Provider
      value={{ 
        hotelSelecionado, 
        setHotelById,
        getHotelById, 
        limparHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}



