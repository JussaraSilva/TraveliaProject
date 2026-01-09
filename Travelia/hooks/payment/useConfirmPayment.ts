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
    if (!pacoteObj) {
        console.warn("Tentativa de confirmação sem objeto de pacote.");
        return;
    }

    try {
      const pacoteFinal = {
        ...pacoteObj,
        // Garante que o ID exista para não duplicar ou sumir no Storage
        id: pacoteObj.id || Date.now().toString(), 
        pagamento: payment,
        desconto: discount,
        data_reserva: new Date().toISOString(),
      };

      // 1️⃣ Aguarda a persistência completa
      console.log("Salvando viagem...", pacoteFinal.id);
      await saveTrip(pacoteFinal);

      // 2️⃣ Redireciona apenas após o sucesso do salvamento
      router.push({
        pathname: "/(app)/_tabs/home/payment/E-Ticket",
        params: {
          pacote: JSON.stringify(pacoteFinal),
        },
      });
    } catch (error) {
      console.error("Erro ao salvar a viagem:", error);
      // Aqui você poderia disparar um Alert.alert("Erro", "Não foi possível salvar sua reserva")
    }
  };
}