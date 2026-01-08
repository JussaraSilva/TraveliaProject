// hooks/useDiscountCalculator.ts
import { useMemo } from "react";

export function useDiscountCalculator(pacote: any, desconto: any) {
  return useMemo(() => {
    if (!pacote || !desconto) return 0;

    const total = pacote.preco.total ?? 0;
    const valor = desconto.valorDesconto ?? 0;

    switch (desconto.tipoDesconto) {
      case "percentual":
        return (total * valor) / 100;

      case "fixo":
        return Math.min(valor, total);

      default:
        return 0;
    }
  }, [pacote, desconto]);
}
