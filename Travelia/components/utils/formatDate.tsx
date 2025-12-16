// formatarDate.tsx

import { Text, TextStyle } from "react-native"
import { formatarDataBR } from "./formatarDataBR"

type DateTextProps = {
  value: string
  variant?: "short" | "full"
  style?: TextStyle
}

export function DateText({ value, variant = "full" }: DateTextProps) {
  return (
    <Text style={style}>
      {formatarDataBR(value, variant)}
    </Text>
  )
}

const style = {}
