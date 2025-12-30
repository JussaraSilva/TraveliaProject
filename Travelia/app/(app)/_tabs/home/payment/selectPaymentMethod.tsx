import { CardGlobal } from "@/components/cards/cardGlobal";
import HeaderGlobal from "@/components/header/headerGlobal";
import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { AppleLogoIcon, CaretLeftIcon, CheckCircleIcon, CreditCardIcon, GooglePlayLogoIcon, PaypalLogoIcon, PlusIcon } from "phosphor-react-native";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native"


type PaymentMethod = {
  id: number;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;

};


export default function SelectPaymentMethod() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{ pacote?: string }>();

  const iconLeftBack = () => {
    router.back();
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (item: PaymentMethod) => {
  setSelectedId(item.id);

  router.replace({
      pathname: '/(app)/_tabs/home/payment',
      params: {
        pacote: params.pacote, // 👈 ESSENCIAL
        paymentId: String(item.id),
        paymentTitle: item.title,
        paymentSubtitle: item.subtitle,
      },
    });
  };




  const method: PaymentMethod[] = [
    { id: 1, icon: CreditCardIcon, title: 'MasterCard', subtitle: '**** **** **** 1234' },
    { id: 2, icon: CreditCardIcon, title: 'Visa', subtitle: '**** **** **** 1234' },
    { id: 3, icon: PaypalLogoIcon, title: 'PayPal', subtitle: 'andrew***@gmail.com' },
    { id: 4, icon: GooglePlayLogoIcon, title: 'Google Pay', subtitle: 'andrew***@gmail.com' },
    { id: 5, icon: AppleLogoIcon, title: 'Apple Pay', subtitle: 'andrew***@gmail.com' },
    { id: 6, icon: CreditCardIcon, title: 'American Express', subtitle: '**** **** **** 1234' },
  ];

  const renderItem = ({ item }: { item: PaymentMethod }) => {
    const Icon = item.icon;
    const isActive = selectedId === item.id;

    return (
    <CardGlobal
      variant="icon-text-icon"
      textTitle={item.title}
      textDescription={item.subtitle}
      containerIconLeftStyle={styles.containerIconLeftStyle}
      contentCardStyle={[
        styles.cardStyleRow,
        isActive && styles.cardActive, // 👈 borda azul
      ]}
      leftIcon={<Icon size={30} color={themeColors[theme].icon} />}
      rightIcon={
        isActive ? (
          <CheckCircleIcon size={26} color={themeColors[theme].realceBlue} />
        ) : null
      }
      onPress={() => handleSelect(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage="Select Payment Method"
          leftIcon={<CaretLeftIcon size={24} color={themeColors[theme].icon} />}
          onPressLeftIcon={iconLeftBack}
          rightIcon={<PlusIcon size={24} color={themeColors[theme].icon} />}
          onPressRightIcon={() => {}}
        />
      </View>

      <FlatList
        data={method}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const createStyles = (theme: ThemeName) =>  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    paddingHorizontal: 5,
  },

  containerHeader: {
    marginBottom: 20,
  },

  containerContentCards: {
    flex: 1,
    paddingHorizontal: 10,
    
  },

  flatCards: {
    flex: 1,

  },

  cardStyleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 30,
  },

  containerIconLeftStyle: {
    backgroundColor: themeColors[theme].backgroundCard,
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  cardActive: {
    borderWidth: 2,
    borderColor: themeColors[theme].realceBlue,
  },


})