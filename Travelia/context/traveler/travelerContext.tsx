import React, { createContext, useState, useContext } from 'react';

// Interface completa do Viajante
export interface Traveler {
  id: string;
  nomeCompleto: string;
  CPF: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  documentType?: string;
  documentNumber?: string;
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
  clearTravelers: () => void;
}

// Valores padrão para evitar erros de 'undefined' antes do Provider carregar
const defaultData: TravelerContextData = {
  savedTravelers: [],
  addTraveler: () => {},
  removeTraveler: () => {},
  clearTravelers: () => {},
};

const TravelerContext = createContext<TravelerContextData>(defaultData);

export const TravelerProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedTravelers, setSavedTravelers] = useState<Traveler[]>([]);

  // Adiciona um novo viajante à lista global
  const addTraveler = (traveler: Traveler) => {
    setSavedTravelers(prev => [...prev, traveler]);
  };
  
  // Remove um viajante baseado no índice (posição no picker)
  const removeTraveler = (index: number) => {
    setSavedTravelers(prev => prev.filter((_, i) => i !== index));
  };

  // Limpa a lista (útil após finalizar uma compra)
  const clearTravelers = () => {
    setSavedTravelers([]);
  };

  return (
    <TravelerContext.Provider 
      value={{ 
        savedTravelers, 
        addTraveler, 
        removeTraveler, 
        clearTravelers 
      }}
    >
      {children}
    </TravelerContext.Provider>
  );
};

// Hook personalizado com proteção contra contexto inexistente
export const useTravelers = () => {
  const context = useContext(TravelerContext);
  
  if (!context) {
    console.warn("useTravelers deve ser usado dentro de um TravelerProvider. Retornando dados padrão.");
    return defaultData;
  }
  
  return context;
};