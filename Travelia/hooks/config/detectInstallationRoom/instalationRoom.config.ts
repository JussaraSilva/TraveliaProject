import {
  TelevisionIcon,
  SpeakerHighIcon,
  CoffeeIcon,
  SnowflakeIcon,
  FanIcon,
  LockIcon,
  PhoneIcon,
  DeskIcon,
  HouseIcon,
  EyeIcon,
  SwimmingPoolIcon,
  FireIcon,
  LightbulbIcon,
  PlugIcon,
  BathtubIcon,
  GlobeIcon,
  DotsThreeIcon,
  BedIcon,
} from 'phosphor-react-native';
import React from "react";





export type RoomServiceCategory =
  | 'tv'
  | 'audio'
  | 'coffee'
  | 'fridge'
  | 'climate'
  | 'fan'
  | 'safe'
  | 'phone'
  | 'workspace'
  | 'balcony'
  | 'view'
  | 'pool'
  | 'fireplace'
  | 'lighting'
  | 'power'
  | 'bathroom'
  | 'bed'
  | 'culture'
  | 'outdoor'
  | 'misc';



export const ROOM_SERVICES_MAP: Record<
  RoomServiceCategory,
  { icon: React.ElementType }
> = {
  tv: { icon: 
    TelevisionIcon
   },
  audio: { 
    icon: SpeakerHighIcon 
  },
  coffee: { 
    icon: CoffeeIcon 
  },
  fridge: { 
    icon: SnowflakeIcon 
  },
  climate: { 
    icon: SnowflakeIcon 
  },
  fan: { 
    icon: FanIcon 
  },
  safe: { 
    icon: LockIcon 
  },
  phone: { 
    icon: PhoneIcon 
  },
  workspace: { 
    icon: DeskIcon 
  },
  balcony: { 
    icon: HouseIcon 
  },
  view: { 
    icon: EyeIcon 
  },
  pool: { 
    icon: SwimmingPoolIcon 
  },
  fireplace: { 
    icon: FireIcon 
  },
  lighting: { 
    icon: LightbulbIcon 
  },
  power: { 
    icon: PlugIcon 
  },
  bathroom: { 
    icon: BathtubIcon 
  },
  bed: { 
    icon: BedIcon 
  },
  culture: { 
    icon: GlobeIcon 
  },
  outdoor: { 
    icon: HouseIcon 
  },
  misc: { 
    icon: DotsThreeIcon 
  },
};