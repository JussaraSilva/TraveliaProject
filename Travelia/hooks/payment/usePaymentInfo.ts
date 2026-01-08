export function usePaymentInfo(pacoteFinal: any) {
  const insurance = 40;
  const tax = 10;

  const subtotal = pacoteFinal?.preco.total ?? 0;

  const valorDesconto =
    pacoteFinal?.desconto?.tipoDesconto === 'percentual'
      ? (subtotal * (pacoteFinal?.desconto?.valorDesconto ?? 0)) / 100
      : pacoteFinal?.desconto?.valorDesconto ?? 0;

  const totalFinal = subtotal + insurance + tax - valorDesconto;

  return {
    currency: pacoteFinal?.preco.moeda ?? 'BRL',

    items: [
      {
        key: 'passengers',
        label: `${pacoteFinal?.viajantes.quantidade ?? 0} Passengers`,
        value: subtotal,
        type: 'price',
      },
      {
        key: 'insurance',
        label: 'Travel Insurance',
        value: insurance,
        type: 'price',
      },
      {
        key: 'tax',
        label: 'Tax',
        value: tax,
        type: 'price',
      },
      {
        key: 'discountTitle',
        label: 'Desconto Aplicado',
        value: pacoteFinal?.desconto?.title ?? 'None',
        type: 'text',
      },
      {
        key: 'discountValue',
        label: 'Valor Desconto',
        value: valorDesconto,
        type: 'price',
      },
      {
        key: 'total',
        label: 'Total Price',
        value: totalFinal,
        type: 'price',
        highlight: true,
      },
    ],
  };
}
