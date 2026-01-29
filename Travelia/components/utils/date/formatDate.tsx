import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import { formatarDataBR } from "./formatarDataBR";

// --- COMPONENTE DateText ---

type DateTextProps = {
  value: string;
  variant?: "short" | "full" | "itinerary";
  textStyle?: StyleProp<TextStyle>;
  addDays?: number;
};

export function DateText({ value, textStyle, variant = "full", addDays = 0 }: DateTextProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Text style={[styles.textDate, textStyle]}>
      {formatarDataBR(value, variant, addDays)}
    </Text>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    textDate: {
      color: themeColors[theme].textPrimary,
    },
  });