import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

export function usePaymentParams() {
  const params = useLocalSearchParams<{
    pacote?: string;
    paymentId?: string;
    paymentTitle?: string;
    paymentSubtitle?: string;
    discountId?: string;
    discountTitle?: string;
    discountSubtitle?: string;
    discountValor?: string;
    discountType?: string;
  }>();

  const pacoteObj = useMemo(() => {
    if (!params.pacote) return null;

    return JSON.parse(
      Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
    );
  }, [params.pacote]);

  const payment = useMemo(() => {
    if (!params.paymentId) return null;

    return {
      id: params.paymentId,
      title: params.paymentTitle ?? "",
      subtitle: params.paymentSubtitle ?? "",
    };
  }, [params.paymentId, params.paymentTitle, params.paymentSubtitle]);

  const discount = useMemo(() => {
    if (!params.discountId) return null;

    return {
      id: params.discountId,
      title: params.discountTitle ?? "",
      subtitle: params.discountSubtitle ?? "",
      valorDesconto: params.discountValor ? Number(params.discountValor) : 0,
      tipoDesconto: params.discountType ?? "",
    };
  }, [
    params.discountId,
    params.discountTitle,
    params.discountSubtitle,
    params.discountValor,
    params.discountType,
  ]);

  return {
    pacoteObj,
    payment,
    discount,
  };
}
