import { useRouter } from "expo-router";
import { saveTrip } from "@/services/tripStorage";

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

  return async () => {
    if (!pacoteObj) return;

    const pacoteFinal = {
      ...pacoteObj,
      pagamento: payment,
      desconto: discount,
      data_reserva: new Date().toISOString(),
    };

    // 1️⃣ Salva o pacote em My Trips
    await saveTrip(pacoteFinal);

    // 2️⃣ Redireciona para E-Ticket
    router.push({
      pathname: "/(app)/_tabs/home/payment/E-Ticket",
      params: {
        pacote: JSON.stringify(pacoteFinal),
      },
    });
  };
}
