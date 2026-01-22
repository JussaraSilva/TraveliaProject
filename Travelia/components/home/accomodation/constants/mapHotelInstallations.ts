import { detectInstallationCategory } from "@/hooks/config/detectInstallationHotel/detectInstallationCategory";
import { IconTextItem } from "../components/lists/iconTextList";
import { INSTALLATIONS_MAP } from "@/hooks/config/detectInstallationHotel/instalations.config";





export function mapHotelInstallations(instalacoes: string[]): IconTextItem[] {
  return instalacoes.map(instalacao => {
    const category = detectInstallationCategory(instalacao);
    return {
      id: instalacao,
      label: instalacao,
      Icon: INSTALLATIONS_MAP[category].icon,
    };
  });
}
