import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface BookingContextData {
  pacote: any;
  setPacoteInicial: (pacote: any) => void;
  updateViajantes: (quantidade: number) => void;
  updatePagamento: (pagamento: any) => void;
  updateDesconto: (desconto: any) => void;
}

const BookingContext = createContext<BookingContextData>({} as BookingContextData);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [pacote, setPacote] = useState<any>(null);

  // Use o useCallback para a função não ser recriada toda hora
  const setPacoteInicial = useCallback((novoPacote: any) => {
      setPacote((current: any) => {
        // Se o pacote que está tentando entrar é o mesmo que já está lá, não faz nada
        if (current?.id === novoPacote.id) return current; 
        
        // Se for um pacote diferente (ou o primeiro), carrega do zero
        return {
          ...novoPacote,
          // Garantimos que os valores originais fiquem salvos para cálculos de preço
          preco: {
            ...novoPacote.preco,
            totalOriginal: novoPacote.preco.total,
          },
          viajantes: {
            ...novoPacote.viajantes,
            quantidadeOriginal: novoPacote.viajantes.quantidade,
          }
        };
      });
    }, []);

  const updateViajantes = useCallback((novaQtd: number) => {
    setPacote((prev: any) => {
      if (!prev) return prev;
      
      const precoTotalOriginal = prev.preco.totalOriginal || prev.preco.total;
      const qtdOriginal = prev.viajantes.quantidadeOriginal || prev.viajantes.quantidade || 1;
      
      const precoUnitario = precoTotalOriginal / qtdOriginal;
      
      return {
        ...prev,
        // Guardamos os valores originais para os cálculos futuros não se perderem
        viajantes: { 
          ...prev.viajantes, 
          quantidade: novaQtd,
          quantidadeOriginal: qtdOriginal 
        },
        preco: { 
          ...prev.preco, 
          total: precoUnitario * novaQtd,
          totalOriginal: precoTotalOriginal
        }
      };
    });
  }, []);

  // Faça o mesmo para updatePagamento e updateDesconto se for usá-los em useEffects
  const updatePagamento = useCallback((pagamento: any) => {
    setPacote((prev: any) => ({ ...prev, pagamento }));
  }, []);

  const updateDesconto = useCallback((desconto: any) => {
    setPacote((prev: any) => ({ ...prev, desconto }));
  }, []);

  return (
    <BookingContext.Provider value={{ 
      pacote, 
      setPacoteInicial, 
      updateViajantes, 
      updatePagamento, 
      updateDesconto 
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);