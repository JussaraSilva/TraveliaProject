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
  if (!data) return ""

  // 🔹 CASO 0 — Data ISO completo: "2026-01-05T18:17:01.850Z"
  const isFullISO = /^\d{4}-\d{2}-\d{2}T/.test(data)

  if (isFullISO) {
    const dateObj = new Date(data)

    const datePart = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })

    const timePart = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    const ampm = dateObj.getHours() >= 12 ? "PM" : "AM"

    return `${datePart} - ${timePart} ${ampm}`
  }


  // 🔹 CASO 1 — Data ISO: "2024-12-31"
  const isISO = /^\d{4}-\d{2}-\d{2}$/.test(data)
  if (isISO) {
    const dateObj = new Date(`${data}T00:00:00`)

    if (tipo === "full") {
      return dateObj.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }

    return dateObj.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // 🔹 CASO 2 — String completa já formatada
  if (tipo === "full") return data

  // Ex: "Sexta-feira, 12 de Abril de 2024"
  const [diaSemanaRaw, resto] = data.split(", ")

  if (!resto) return data // fallback de segurança

  const [dia, , mes, , ano] = resto.split(" ")

  const diaSemana = diasMap[diaSemanaRaw.replace("-feira", "")] ?? ""
  const mesAbrev = mesesMap[mes] ?? mes

  return `${diaSemana}, ${dia} ${mesAbrev} ${ano}`
}

