// formatarDate.tsx

import { StyleSheet, Text, TextStyle } from "react-native"
import { formatarDataBR } from "./formatarDataBR"
import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from "@/context/themeProvider"
import { useMemo } from "react"

type DateTextProps = {
  value: string
  variant?: "short" | "full"
  style?: TextStyle
}

export function DateText({ value, variant = "full" }: DateTextProps) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);



  return (
    <Text style={styles.styleText}>
      {formatarDataBR(value, variant)}
    </Text>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    styleText: {
      color: themeColors[theme].textPrimary,
    },
  });
