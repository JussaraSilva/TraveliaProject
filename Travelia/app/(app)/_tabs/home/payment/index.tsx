import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useMemo, useState, useEffect } from "react";
import { CaretLeftIcon, CaretRightIcon, CoinsIcon, PercentIcon, WalletIcon } from 'phosphor-react-native';
import HeaderGlobal from "@/components/header/headerGlobal";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName } from "@/constants/theme";
import BookingStepsLine from "@/components/buttons/bookingStepsLine";
import { router, useLocalSearchParams } from "expo-router";
import { PacoteViagem } from "@/assets/types/bookingType";
import CardPacketResume from "@/components/cards/cardPacketResume";
import CardDetailsGlobal from "@/components/cards/cardDetailsGlobal";
import PriceDetailsResume from "@/components/cards/priceDetails";
import { PriceText } from "@/components/utils/priceText";

export default function Payment() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{
    pacote?: string;
    paymentId?: string;
    paymentTitle?: string;
    paymentSubtitle?: string;
    discountId?: string;
    discountTitle?: string;
    discountSubtitle?: string;
    discountValor?: string
    discountType?: string
  }>();

  const [payment, setPayment] = useState<{id: string, title: string, subtitle: string} | null>(null);
  const [discount, setDiscount] = useState<{id: string, title: string, subtitle: string, valorDesconto: number} | null>(null);

  /** 📦 Pacote */
  const pacoteObj: PacoteViagem | null = params.pacote
    ? JSON.parse(
        Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
      )
    : null;

    
    /** ✅ SINCRONIZA PAGAMENTO (uma vez por mudança) */
    useEffect(() => {
    if (params.paymentId) {
      setPayment({
        id: params.paymentId,
        title: params.paymentTitle || "",
        subtitle: params.paymentSubtitle || "",
      });
    }
  }, [params.paymentId, params.paymentTitle, params.paymentSubtitle]);


  /** ✅ SINCRONIZA DESCONTO (uma vez por mudança) */
  useEffect(() => {
    if (params.discountId) {
      setDiscount({
        id: params.discountId,
        title: params.discountTitle || "",
        subtitle: params.discountSubtitle || "",
        valorDesconto: params.discountTitle ? Number(params.discountTitle) : 0
      });
    }
  }, [params.discountId, params.discountTitle, params.discountSubtitle]);





  
  if (!pacoteObj) {
    return <View />;
  }

  
  const selectPayment = () => {
  router.push({
    pathname: "/(app)/_tabs/home/payment/selectPaymentMethod",
    params: {
      pacote: params.pacote,

      // mantém pagamento atual
      paymentId: payment?.id,
      paymentTitle: payment?.title,
      paymentSubtitle: payment?.subtitle,

      // mantém desconto atual
      discountId: discount?.id,
      discountTitle: discount?.title,
      discountSubtitle: discount?.subtitle,
      discountValor: discount?.valorDesconto,
      },
    });
  };



  const selectDiscount = () => {
  router.push({
    pathname: "/(app)/_tabs/home/payment/discount",
    params: {
        pacote: params.pacote,

        // mantém pagamento
        paymentId: payment?.id,
        paymentTitle: payment?.title,
        paymentSubtitle: payment?.subtitle,

        // mantém desconto
        discountId: discount?.id,
        discountTitle: discount?.title,
        discountSubtitle: discount?.subtitle,
        discountValor: discount?.valorDesconto,
      },
    });
    console.log('pacoteObj', pacoteObj);
  };


  

  const hasPaymentSelected = Boolean(payment);
  const hasDiscountSelected = Boolean(discount);


  const handleConfirmPayment = () => {
  const pacoteFinal = {
    ...pacoteObj,

    

    pagamento: payment
      ? {
          id: payment.id,
          title: payment.title,
          subtitle: payment.subtitle,
        }
      : null,

    desconto: discount
      ? {
          id: discount.id,
          title: discount.title,
          subtitle: discount.subtitle,
          valorDesconto: discount.valorDesconto,
        }
      : null,

      data_reserva: new Date().toISOString(),
      
  };

  router.push({
    pathname: '/(app)/_tabs/home/payment/E-Ticket',
    params: {
      pacote: JSON.stringify(pacoteFinal),
    },
    
  });
};


  

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal 
          titlePage="Payment Details"
          leftIcon={<CaretLeftIcon size={24} color={themeColors[theme].icon} />}
          onPressRightIcon={() => {}}
        />

        <View style={styles.containerSteps}>
          <BookingStepsLine />
        </View>
      </View>

      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.containerContentResume}>
          <CardPacketResume 
            namePacket={pacoteObj.nome_pacote}
            dataCheckIn={pacoteObj.estadia.checkin}
            dataCheckOut={pacoteObj.estadia.checkout}
            imagePacket={pacoteObj.imagens[0]}
            onPressResumePacket={() => {}}
          />

          {/* 💳 Payment */}
          <CardDetailsGlobal 
            title="Payment Method"
            leftIcon={<WalletIcon size={24} color={themeColors[theme].icon} />}
            rightIcon={<CaretRightIcon size={20} color={themeColors[theme].icon} />}
            onPressIcon={selectPayment}
            showDivider={hasPaymentSelected}
          >
            {hasPaymentSelected && (
              <View style={styles.paymentMethodStyleText}>
                <Text style={styles.paymentMethodText}>{payment?.subtitle}</Text>
              </View>
            )}
          </CardDetailsGlobal>

          {/* 🎟️ Discount */}
          <CardDetailsGlobal 
            title="Discount / Vouchers"
            leftIcon={<PercentIcon size={24} color={themeColors[theme].icon} />}
            rightIcon={<CaretRightIcon size={20} color={themeColors[theme].icon} />}
            onPressIcon={selectDiscount}
            showDivider={hasDiscountSelected}
          >
            {hasDiscountSelected && (
              <View style={styles.discountCodeStyleText}>
                <Text style={styles.discountCodeText}>{discount?.title}</Text>
              </View>
            )}
          </CardDetailsGlobal>

          <PriceDetailsResume 
            leftIconPriceDetails={<CoinsIcon size={24} color={themeColors[theme].icon} />}
            labelRowPrice="Travel Package Price"
            precoPorPessoa={pacoteObj.preco.total}
            moeda={pacoteObj.preco.moeda}
            parcelamento={pacoteObj.preco.parcelamento}
            precoTotal={pacoteObj.preco.total}
          />
        </View>
      </ScrollView>

      <View style={styles.containerFooter}>
          <TouchableOpacity style={styles.iconButtonFooter}
            onPress={handleConfirmPayment}
          >
            <Text style={styles.textButtonFooter}>Confirm Payment - </Text> 
            <PriceText
              value={pacoteObj.preco.total}
              currency={pacoteObj.preco.moeda}
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