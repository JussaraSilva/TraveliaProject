import { Atividades } from "@/assets/types/bookingType/atividades";
import { adaptReviewsToUI } from "@/components/utils/adapter/adapterAccomodationReviews";
import { useBooking } from "@/context/booking/bookingContext";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";

export function useDetailsLogic() {
  
  const { setPacoteInicial } = useBooking();
  const params = useLocalSearchParams<{ pacote?: string }>();

  const pacoteObj = useMemo(() => {
    try {
      return JSON.parse(params.pacote ?? '{}');
    } catch {
      return {};
    }
  }, [params.pacote]);
  
  
  
  useEffect(() => {
    if (pacoteObj && pacoteObj.nome_pacote) {
      // Usamos uma função de reset/set para garantir que 
      // o rascunho anterior seja substituído pelo atual
      setPacoteInicial(pacoteObj);
    }
  }, [pacoteObj, setPacoteInicial]);
  
  
    const handleAccomodation = () => {
    router.push({
      pathname: '/(app)/_tabs/home/accommodation',
      params: {
        hotelId: pacoteObj.acomodacao.id,
      },
    });
    console.log("Details diz, O Id do hotel é: " + (pacoteObj.acomodacao.id));
  };

  const reviewsUI = adaptReviewsToUI(pacoteObj.reviews ?? []);

  const handleAtividades = () => {
    const atividadesIds = (pacoteObj.atividades as Atividades[]).map(
      (atividade) => atividade.id_atividade
    );

    router.push({
      pathname: '/(app)/_tabs/home/atividades',
      params: {
        atividadesIds: JSON.stringify(atividadesIds),
      },
    });

    console.log('IDs enviados:', atividadesIds);
  };

  const handleReviews = () => {
    router.push({
      pathname: '/(app)/_tabs/home/reviews/ratingReviews',
      params: {
        source:"pacote",
        hotelId: pacoteObj.id,
      },
    });
  };

  return { pacoteObj, handleAccomodation, reviewsUI, handleAtividades, handleReviews };
}