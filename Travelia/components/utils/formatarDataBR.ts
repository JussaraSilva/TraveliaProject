const mesesMap: Record<string, string> = {
  Janeiro: "Jan",
  Fevereiro: "Fev",
  Março: "Mar",
  Abril: "Abr",
  Maio: "Mai",
  Junho: "Jun",
  Julho: "Jul",
  Agosto: "Ago",
  Setembro: "Set",
  Outubro: "Out",
  Novembro: "Nov",
  Dezembro: "Dez",
}

const diasMap: Record<string, string> = {
  Segunda: "Seg",
  Terça: "Ter",
  Quarta: "Qua",
  Quinta: "Qui",
  Sexta: "Sex",
  Sábado: "Sáb",
  Domingo: "Dom",
}

export function formatarDataBR(
  data: string,
  tipo: "short" | "full" = "full"
) {
  if (tipo === "full") return data

  // Ex: "Sexta-feira, 12 de Abril de 2024"
  const [diaSemanaRaw, resto] = data.split(", ")
  const [dia, , mes, , ano] = resto.split(" ")

  const diaSemana = diasMap[diaSemanaRaw.replace("-feira", "")] ?? ""
  const mesAbrev = mesesMap[mes] ?? mes

  return `${diaSemana}, ${dia} ${mesAbrev} ${ano}`
}
