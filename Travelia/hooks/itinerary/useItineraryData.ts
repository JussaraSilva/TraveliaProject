import { useMemo } from "react";

// hooks/itinerary/useItineraryData.ts
export function useItineraryData(pacoteOriginal: any, selectedDayIndex: number) {
  return useMemo(() => {
    // Se não houver pacote, retorna arrays vazios para evitar tela branca
    if (!pacoteOriginal || !pacoteOriginal.itinerario) {
      return { filterDays: [], diasParaRenderizar: [] };
    }

    const totalDias = pacoteOriginal.itinerario.length;
    const filterDays = ['All', ...Array.from({ length: totalDias }, (_, i) => `Day ${i + 1}`)];

    const diasParaRenderizar = selectedDayIndex === 0 
      ? pacoteOriginal.itinerario 
      : pacoteOriginal.itinerario.filter((d: any) => d.dia === selectedDayIndex);

    return { filterDays, diasParaRenderizar };
  }, [pacoteOriginal, selectedDayIndex]);
}