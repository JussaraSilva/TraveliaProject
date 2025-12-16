import { Text, TextStyle } from "react-native"
import { formatCurrency } from "./formatCurrency"

type PriceTextProps = {
  value: number
  currency?: string
  locale?: string
  style?: TextStyle
}

export function PriceText({
  value,
  currency = "BRL",
  locale = "pt-BR",
  style,
}: PriceTextProps) {
  return (
    <Text style={style}>
      {formatCurrency(value, currency, locale)}
    </Text>
  )
}
