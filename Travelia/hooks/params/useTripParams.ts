// hooks/useTripParams.ts
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

export function useTripParams() {
  const params = useLocalSearchParams<{ pacote?: string }>();

  const pacoteFinal = useMemo(() => {
    if (!params.pacote) return null;

    return JSON.parse(
      Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
    );
  }, [params.pacote]);

  return { pacoteFinal };
}
