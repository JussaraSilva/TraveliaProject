// =========================
// PaymentSummary.tsx (COMPONENTE BURRO)
// =========================
import { Text, View, StyleSheet } from "react-native";
import { CaretRightIcon, PercentIcon, WalletIcon } from "phosphor-react-native";
import CardDetailsGlobal from "@/components/cards/cardDetailsGlobal";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName} from "@/constants/theme";
import { useMemo } from "react";

export type PaymentSummaryProps = {
  payment: { id: string; title: string; subtitle: string } | null;
  discount: {
    id: string;
    title: string;
    subtitle: string;
    valorDesconto: number;
    tipoDesconto: string;
  } | null;
  currency: string;
  onSelectPayment: () => void;
  onSelectDiscount: () => void;
};

export default function PaymentSummary({
  payment,
  discount,
  currency,
  onSelectPayment,
  onSelectDiscount,
}: PaymentSummaryProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <>
      <CardDetailsGlobal
        title="Payment Method"
        leftIcon={<WalletIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={20} color={themeColors[theme].icon} />}
        onPressIcon={onSelectPayment}
        showDivider={!!payment}
      >
        {payment && <Text>{payment.subtitle}</Text>}
      </CardDetailsGlobal>

      <CardDetailsGlobal
        title="Discount / Vouchers"
        leftIcon={<PercentIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={20} color={themeColors[theme].icon} />}
        onPressIcon={onSelectDiscount}
        showDivider={!!discount}
      >
        {discount && (
          <View style={{ gap: 4 }}>
            <Text style={styles.discountTitle}>
              {discount.title}
            </Text>
        </View>
)}

      </CardDetailsGlobal>
    </>
  );
}

// =========================
// styles
// =========================
const createStyles = (theme: ThemeName) => (
  StyleSheet.create({
    discountTitle: {
      fontWeight: "bold",
      color: themeColors[theme].textPrimary,
    },

  }))