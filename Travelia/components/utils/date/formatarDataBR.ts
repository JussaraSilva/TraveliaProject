
// --- FUNÇÃO DE FORMATAÇÃO ---

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
};

const diasMap: Record<string, string> = {
  Segunda: "Seg",
  Terça: "Ter",
  Quarta: "Qua",
  Quinta: "Qui",
  Sexta: "Sex",
  Sábado: "Sáb",
  Domingo: "Dom",
};

// Lista auxiliar para converter nome em índice (necessário para seu JSON atual)
const mesesLista = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function formatarDataBR(
  data: string,
  tipo: "short" | "full" | "itinerary" = "short",
  addDays: number = 0
) {
  if (!data) return "";

  let dataParaProcessar = data;
  let dateObj: Date | null = null;

  // 1. Lógica para entender a string do seu JSON: "Sábado, 15 de Março de 2025"
  if (data.includes(" de ")) {
    try {
      const partes = data.split(", ");
      const textoData = partes[1] || partes[0]; // "15 de Março de 2025"
      const [dia, , mesNome, , ano] = textoData.split(" ");
      const mesIndex = mesesLista.indexOf(mesNome);

      if (mesIndex !== -1) {
        dateObj = new Date(Number(ano), mesIndex, Number(dia), 12, 0, 0);
      }
    } catch (e) {
      dateObj = null;
    }
  } 
  // 2. Fallbacks para outros formatos (ISO ou DD/MM/YYYY)
  else if (data.includes("/")) {
    const [d, m, y] = data.split("/");
    dateObj = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
  } else if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
    dateObj = new Date(`${data.split("T")[0]}T12:00:00`);
  } else {
    const tempDate = new Date(data);
    if (!isNaN(tempDate.getTime())) dateObj = tempDate;
  }

  // 3. Aplicação do addDays se o objeto Date for válido
  if (dateObj && !isNaN(dateObj.getTime())) {
    if (addDays !== 0) {
      dateObj.setDate(dateObj.getDate() + addDays);
    }

    // Retorno imediato para o formato da imagem (Ex: Dec 27)
    if (tipo === "itinerary") {
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    // Para "short" e "full", transformamos de volta em ISO para cair nos casos originais
    dataParaProcessar = dateObj.toISOString().split("T")[0];
  }

  // --- LÓGICA ORIGINAL PRESERVADA ---

  // 🔹 CASO 0 — Data ISO completo
  const isFullISO = /^\d{4}-\d{2}-\d{2}T/.test(data);
  if (isFullISO && tipo !== "itinerary") {
    const dObj = new Date(data);
    const datePart = dObj.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const timePart = dObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    const ampm = dObj.getHours() >= 12 ? "PM" : "AM";
    return `${datePart} - ${timePart} ${ampm}`;
  }

  // 🔹 CASO 1 — Data ISO (Agora com a data processada e somada)
  const isISO = /^\d{4}-\d{2}-\d{2}$/.test(dataParaProcessar);
  if (isISO) {
    const dObj = new Date(`${dataParaProcessar}T00:00:00`);
    if (tipo === "full") {
      return dObj.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    }
    return dObj.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  }

  // 🔹 CASO 2 — String legada ou formatada
  if (tipo === "full") return dataParaProcessar;

  const partesOriginal = dataParaProcessar.split(", ");
  if (partesOriginal.length < 2) return dataParaProcessar;

  const diaSemanaRaw = partesOriginal[0];
  const restoTexto = partesOriginal[1];
  const [diaNum, , mesNomeResto, , anoNum] = restoTexto.split(" ");

  const diaSemana = diasMap[diaSemanaRaw.replace("-feira", "")] ?? "";
  const mesAbrev = mesesMap[mesNomeResto] ?? mesNomeResto;

  return `${diaSemana}, ${diaNum} ${mesAbrev} ${anoNum}`;
}