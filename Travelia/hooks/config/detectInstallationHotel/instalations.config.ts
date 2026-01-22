import { 
  BabyIcon,
  BarbellIcon, 
  BellIcon, 
  BicycleIcon, 
  BinocularsIcon, 
  BriefcaseIcon, 
  CarIcon, 
  ForkKnifeIcon, 
  LetterCirclePIcon, 
  MapTrifoldIcon,  
  MartiniIcon,  
  PersonSimpleRunIcon, 
  QuestionIcon, 
  SparkleIcon, 
  SwimmingPoolIcon, 
  ThermometerIcon, 
  UmbrellaIcon, 
  WifiHighIcon
} 
from "phosphor-react-native";
import React from "react";




export type InstallationCategory =
  | 'food'
  | 'drink'
  | 'pool'
  | 'spa'
  | 'fitness'
  | 'activities'
  | 'transport'
  | 'parking'
  | 'concierge'
  | 'business'
  | 'wifi'
  | 'tourism'
  | 'beach'
  | 'rental'
  | 'kids'
  | 'view'
  | 'comfort'
  | 'other';



export const INSTALLATIONS_MAP: Record<
  InstallationCategory, {
    label: string;
    icon: React.ComponentType<any>;
  }
> = {
  food: {
    label:"Alimentação",
    icon: ForkKnifeIcon,
  },
  
  drink: {
    label:"Bebidas",
    icon: MartiniIcon,
  },

  pool: {
    label:"Piscina",
    icon: SwimmingPoolIcon,
  },
  spa: {
    label:"Spa e Relaxamento",
    icon: SparkleIcon,
  },
  fitness: {
    label:"Academia",
    icon: BarbellIcon,
  },
  activities: {
    label:"Atividades",
    icon: PersonSimpleRunIcon,
  },
  transport: {
    label:"Transporte",
    icon: CarIcon,
  },
  parking: {
    label:"Estacionamento",
    icon: LetterCirclePIcon,
  },
  concierge: {
    label:"Concierge",
    icon: BellIcon,
  },
  business: {
    label:"Negócios",
    icon: BriefcaseIcon,
  },
  wifi: {
    label:"Wi-Fi",
    icon: WifiHighIcon,
  },
  tourism: {
    label:"Turismo",
    icon: MapTrifoldIcon,
  },
  beach: {
    label:"Praia",
    icon: UmbrellaIcon,
  },
  rental: {
    label:"Aluguel",
    icon: BicycleIcon,
  },
  kids: {
    label:"Área Kids",
    icon: BabyIcon,
  },
  view: {
    label:"Vista",
    icon: BinocularsIcon,
  },
  comfort: {
    label:"Conforto",
    icon: ThermometerIcon,
  },
  other: {
    label:"Outros",
    icon: QuestionIcon,
  },
}