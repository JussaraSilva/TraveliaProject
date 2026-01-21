// formatarDate.tsx

import { StyleProp, StyleSheet, Text, TextStyle } from "react-native"
import { formatarDataBR } from "./formatarDataBR"
import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from "@/context/themeProvider"
import { useMemo } from "react"

type DateTextProps = {
  value: string
  variant?: "short" | "full"
  textStyle?: StyleProp<TextStyle>
}

export function DateText({ value, textStyle, variant = "full" }: DateTextProps) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);



  return (
    <Text style={[styles.textDate, textStyle]}>
      {formatarDataBR(value, variant)}
    </Text>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    textDate: {
      color: themeColors[theme].textPrimary,
    },
  });
