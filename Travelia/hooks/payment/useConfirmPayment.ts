import { useRouter } from "expo-router";

export function useConfirmPayment({
  pacoteObj,
  payment,
  discount,
}: {
  pacoteObj: any;
  payment: any;
  discount: any;
}) {
  const router = useRouter();

  return () => {
    if (!pacoteObj) return;

    const pacoteFinal = {
      ...pacoteObj,
      pagamento: payment,
      desconto: discount,
      data_reserva: new Date().toISOString(),
    };

    router.push({
      pathname: "/(app)/_tabs/home/payment/E-Ticket",
      params: {
        pacote: JSON.stringify(pacoteFinal),
      },
    });
  };
}
