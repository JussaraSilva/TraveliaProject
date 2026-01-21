import { Text, TextStyle } from "react-native"
import { formatCurrency } from "./formatCurrency"

type PriceTextProps = {
  value?: number | string | null
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
  if (value == null) return null

  // Se vier texto do JSON, exibe direto
  if (typeof value === "string") {
    return <Text style={style}>{value}</Text>
  }

  // Se for número válido, formata
  if (typeof value === "number" && !Number.isNaN(value)) {
    return (
      <Text style={style}>
        {formatCurrency(value, currency, locale)}
      </Text>
    )
  }

  return null
}


