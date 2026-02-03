import { PacoteViagem } from '@/assets/types/bookingType';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface BookingContextData {
  pacoteOriginal: PacoteViagem | null;
  pacoteAtual: PacoteViagem | null;
  setPacoteInicial: (pacote: PacoteViagem) => void;
  updateViajantes: (quantidade: number) => void;
  updatePagamento: (pagamento: any) => void;
  updateDesconto: (desconto: any) => void;
}

const BookingContext = createContext<BookingContextData>({} as BookingContextData);



export function BookingProvider({ children }: { children: ReactNode }) {

  const [pacoteOriginal, setPacoteOriginal] = useState<PacoteViagem | null>(null);
const [pacoteAtual, setPacoteAtual] = useState<PacoteViagem | null>(null);


  // Use o useCallback para a função não ser recriada toda hora
  const setPacoteInicial = useCallback((novoPacote: PacoteViagem) => {
  setPacoteOriginal(novoPacote);
  setPacoteAtual(novoPacote);
}, []);





  
  const updateViajantes = useCallback((novaQtd: number) => {
  setPacoteAtual((prev) => {
    if (!prev || !pacoteOriginal) return prev;

    const precoUnitario =
      pacoteOriginal.preco.total / pacoteOriginal.viajantes.quantidade;

    return {
      ...prev,
      viajantes: {
        ...prev.viajantes,
        quantidade: novaQtd,
      },
      preco: {
        ...prev.preco,
        total: precoUnitario * novaQtd,
      },
    };
  });
}, [pacoteOriginal]);


  // Faça o mesmo para updatePagamento e updateDesconto se for usá-los em useEffects
  const updatePagamento = useCallback((pagamento: any) => {
    setPacoteAtual((prev: any) => {
      if (!prev) return prev;
      return { ...prev, pagamento };
    });
  }, []);


  const updateDesconto = useCallback((desconto: any) => {
    setPacoteAtual((prev: any) => {
      if (!prev) return prev;
      return { ...prev, desconto };
    });
  }, []);




  return (
    <BookingContext.Provider
      value={{
        pacoteOriginal,
        pacoteAtual,
        setPacoteInicial,
        updateViajantes,
        updatePagamento,
        updateDesconto,
        
      }}
    >
      {children}
    </BookingContext.Provider>

  );
}

export const useBooking = () => useContext(BookingContext);