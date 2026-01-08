export function usePriceDetails(
  pacoteFinal: any,
  valorDescontoFinal: number
) {
  if (!pacoteFinal) return [];

  const insurance = 40;
  const tax = 10;
  const totalBase = pacoteFinal.preco.total ?? 0;

  return [
    {
      label: `${pacoteFinal.viajantes.quantidade ?? 0} Passengers`,
      value: totalBase,
      type: 'price',
    },
    {
      label: 'Travel Insurance',
      value: insurance,
      type: 'price',
    },
    {
      label: 'Tax',
      value: tax,
      type: 'price',
    },
    {
      label: 'Desconto Aplicado',
      value: pacoteFinal.desconto?.title || 'None',
      type: 'text',
    },
    {
      label: 'Valor Desconto',
      value: valorDescontoFinal,
      type: 'price',
    },
    {
      label: 'Total Price',
      value: totalBase + insurance + tax - valorDescontoFinal,
      type: 'price',
    },
  ];
}
