import { useMemo } from "react";

export function usePaymentCalculation({
  pacoteObj,
  discount,
}: {
  pacoteObj: any;
  discount: any;
}) {

  const valorDesconto = useMemo(() => {
  if (!pacoteObj || !discount) return 0;

  const total = pacoteObj.preco.total ?? 0;

  switch (discount.tipoDesconto) {
    case "percentual":
      return (total * discount.valorDesconto) / 100;

    case "fixo":
      return Math.min(discount.valorDesconto, total);

    default:
      return 0;
    }
  }, [pacoteObj, discount]);

  const insurance = 40;
  const tax = 10;


  const totalFinal = useMemo(() => {
    if (!pacoteObj) return 0;

    return pacoteObj.preco.total  + insurance + tax - valorDesconto;
  }, [pacoteObj, valorDesconto]);

  return {
    valorDesconto,
    totalFinal,
  };
}
