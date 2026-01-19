
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { CaretLeftIcon, CoinsIcon } from "phosphor-react-native";
import HeaderGlobal from "@/components/header/headerGlobal";
import { themeColors, ThemeName } from "@/constants/theme";
import BookingStepsLine from "@/components/buttons/bookingStepsLine";
import { router } from "expo-router";
import CardPacketResume from "@/components/cards/cardPacketResume";
import PriceDetailsResume from "@/components/cards/priceDetails";
import { PriceText } from "@/components/utils/priceText";
import PaymentSummary from "@/components/home/paymentSummary";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { usePaymentCalculation } from "@/hooks/payment/usePaymentCalculation";
import { usePaymentParams } from "@/hooks/payment/usePaymentParams";
import { useConfirmPayment } from "@/hooks/payment/useConfirmPayment";
import { useBooking } from "@/context/booking/bookingContext";



export default function Payment() {
  
  const { theme, styles } = useThemedStyles(createStyles);

  const { pacoteAtual: pacote } = useBooking();

  const { payment, discount } = usePaymentParams();


  const handleConfirmPayment = useConfirmPayment({
    pacoteObj: pacote, // <--- use pacote
    payment,
    discount,
  });
  
  // 🧮 Cálculo de desconto e total
  const { valorDesconto, totalFinal } = usePaymentCalculation({
    pacoteObj: pacote, // <--- use pacote
    discount,
  });
  

  if (!pacote) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 16, color: "red" }}>Loading booking data...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage="Payment Details"
          leftIcons={[<CaretLeftIcon key="back" size={24} color={themeColors[theme].icon} />]}
        />

        <View style={styles.containerSteps}>
          <BookingStepsLine />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerContentResume}>
          <CardPacketResume
            namePacket={pacote.nome_pacote}
            dataCheckIn={pacote.estadia.checkin}
            dataCheckOut={pacote.estadia.checkout}
            imagePacket={pacote.imagens[0]}
            onPressResumePacket={() => {}}
          />

          <PaymentSummary
            payment={payment}
            discount={discount}
            currency={pacote.preco.moeda}
            onSelectPayment={() => {
              router.push({
              pathname: "/(app)/_tabs/home/payment/selectPaymentMethod",
              params: {
                pacote: JSON.stringify(pacote),
                discountId: discount?.id,
                discountTitle: discount?.title,
                discountSubtitle: discount?.subtitle,
                discountValor: discount?.valorDesconto?.toString(),
                discountType: discount?.tipoDesconto,
              } satisfies Record<string, string | number | undefined>,
            });
          }}
            onSelectDiscount={() => {
              router.push({
                pathname: "/(app)/_tabs/home/payment/discount",
                params: {
                  pacote: JSON.stringify(pacote),
                  paymentId: payment?.id,
                  paymentTitle: payment?.title,
                  paymentSubtitle: payment?.subtitle,
                } satisfies Record<string, string | number | undefined>,
              });
            }}
          />

          <PriceDetailsResume
            leftIconPriceDetails={<CoinsIcon size={24} color={themeColors[theme].icon} />}
            labelRowPrice="Travel Package Price"
            qtdPessoas={pacote.viajantes.quantidade}
            precoPorPessoa={pacote.preco.total}
            moeda={pacote.preco.moeda}
            parcelamento={pacote.preco.parcelamento}
            valorDesconto={valorDesconto}
            precoTotal={totalFinal}
          />
        </View>
      </ScrollView>

      <View style={styles.containerFooter}>
        <TouchableOpacity 
          style={[
            styles.iconButtonFooter, 
            !pacote && { opacity: 0.5 } // Estética de desabilitado
          ]} 
          onPress={handleConfirmPayment}
          disabled={!pacote} // Evita cliques acidentais se o objeto sumir
        >
          <Text style={styles.textButtonFooter}>Confirm Payment - </Text>
          <PriceText
              value={totalFinal}
              currency={pacote?.preco.moeda ?? 'BRL'}
              style={styles.textPriceValue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}






const createStyles = (theme: ThemeName) => (
  StyleSheet.create({
    container: {
      backgroundColor: themeColors[theme].background,
      flex: 1,
    },

    containerHeader: {
      flexDirection: 'column',
      backgroundColor: themeColors[theme].backgroundCard,

    },

    containerSteps: {
      marginTop: 10,
      marginBottom: 20,
    },

    containerScroll: {
      flex: 1,
    },

    containerContentResume: {
      flex: 1,
      flexDirection: 'column',
      gap: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
    },

    containerContentInfoResumePacket: {
      flexDirection: 'column',
      gap: 10,
      marginTop: 10,
    },

    paymentMethodsContainer: {
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 10,
    },

    borderStylesCardDetailsGlobal: {
      marginBottom: 10,
    },

    containerDiscountCodes: {
      marginBottom: 10,
    },

    containerPriceFooter: {
      marginBottom: 10,
    },

    containerFooter: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: themeColors[theme].backgroundCard,
      alignItems: 'center',
    },

    buttonFooter: {
      backgroundColor: themeColors[theme].realceBlue,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 10,
    },

    textButtonFooter: {
      color: themeColors[theme].textButton,
      fontSize: 16,
      fontWeight: 'bold',
    },

    iconButtonFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors[theme].realceBlue,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 20,
    },

    textPriceValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    paymentMethodStyleText: {
      flexDirection: 'column',
      gap: 5,
      paddingHorizontal: 10,
    },
    
    paymentMethodText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    discountCodeStyleText: {
      flexDirection: 'column',
      gap: 5,
      paddingHorizontal: 10,
    },
    
    discountCodeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

  })
);