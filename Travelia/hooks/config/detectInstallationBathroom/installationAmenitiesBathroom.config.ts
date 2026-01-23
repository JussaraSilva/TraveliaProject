import { GlobeIcon, HairDryerIcon, InfoIcon, LeafIcon, PackageIcon, ShowerIcon, SparkleIcon } from "phosphor-react-native";
import { BathroomAmenityCategory } from "./detectBathroomAmenity";

export const BATHROOM_AMENITIES_MAP: Record<
  BathroomAmenityCategory,
  { icon: React.ElementType }
> = {
  hair: { 
    icon: HairDryerIcon
  },
  bath: { 
    icon: ShowerIcon 
  },
  luxury: { 
    icon: SparkleIcon 
  },
  culture: { 
    icon: GlobeIcon 
  },
  eco: { 
    icon: LeafIcon 
  },
  amenities: { 
    icon: PackageIcon 
  },
  misc: { 
    icon: InfoIcon 
  },
};
