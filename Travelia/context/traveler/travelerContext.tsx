import React, { createContext, useState, useContext } from 'react';

// Interface completa do Viajante
export interface Traveler {
  id: string;
  nomeCompleto: string;
  CPF: string;
  seat: string;
  email?: string;
  phone?: string;
  dobDay?: string;
  dobMonth?: string;
  dobYear?: string;
  gender?: string;
  identityNumber?: string;
  identityCountry?: string;
  identityIssueDate?: string;
  identityExpiryDate?: string;
  passportNumber?: string;
  passportCountry?: string;
  passportExpiryDate?: string;
  nationality?: string;
  driverLicenseNumber?: string;
  driverLicenseCountry?: string;
  driverLicenseIssueDate?: string;
  driverLicenseExpiryDate?: string;
}

interface TravelerContextData {
  savedTravelers: Traveler[];
  addTraveler: (traveler: Traveler) => void;
  removeTraveler: (index: number) => void;
  updateTraveler: (index: number, updatedTraveler: Traveler) => void; // NOVO
  clearTravelers: () => void;
  updateSeatForTraveler: (index: number, seat: string) => void; // 🔥
}

// Valores padrão para evitar erros de 'undefined' antes do Provider carregar
const defaultData: TravelerContextData = {
  savedTravelers: [],
  addTraveler: () => {},
  removeTraveler: () => {},
  updateTraveler: () => {}, // NOVO
  clearTravelers: () => {},
  updateSeatForTraveler: () => {},
};

const TravelerContext = createContext<TravelerContextData>(defaultData);

export const TravelerProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedTravelers, setSavedTravelers] = useState<Traveler[]>([]);

  const addTraveler = (traveler: Traveler) => {
    setSavedTravelers(prev => [...prev, traveler]);
  };
  
  const removeTraveler = (index: number) => {
    setSavedTravelers(prev => prev.filter((_, i) => i !== index));
  };

  // FUNÇÃO PARA ATUALIZAR UM VIAJANTE EXISTENTE
  const updateTraveler = (index: number, updatedTraveler: Traveler) => {
    setSavedTravelers(prev => {
      const newData = [...prev];
      newData[index] = updatedTraveler;
      return newData;
    });
  };

  const clearTravelers = () => {
    setSavedTravelers([]);
  };

    function updateSeatForTraveler(index: number, seat: string) {
    setSavedTravelers(prev =>
      prev.map((t, i) =>
        i === index ? { ...t, seat } : t
      )
    );
  }


  return (
    <TravelerContext.Provider 
      value={{ 
        savedTravelers, 
        addTraveler, 
        removeTraveler, 
        updateTraveler, // ADICIONADO AQUI
        clearTravelers,
        updateSeatForTraveler,
      }}
    >
      {children}
    </TravelerContext.Provider>
  );
};

export const useTravelers = () => {
  const context = useContext(TravelerContext);
  if (!context) return defaultData;
  return context;
};