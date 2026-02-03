
const mesesLista = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function formatarDataBR(
  data: string,
  tipo: "short" | "full" | "itinerary" = "short",
  addDays: number = 0
) {
  if (!data) return "";

  let dateObj: Date | null = null;

  // 1. Parsing da string "Sábado, 15 de Março de 2025"
  if (data.includes(" de ")) {
    try {
      const partes = data.split(", ");
      const textoData = partes[1] || partes[0];
      const [dia, , mesNome, , ano] = textoData.split(" ");
      const mesIndex = mesesLista.indexOf(mesNome);
      if (mesIndex !== -1) {
        dateObj = new Date(Number(ano), mesIndex, Number(dia), 12, 0, 0);
      }
    } catch {
      dateObj = null;
    }
  } 
  // 2. Fallbacks (ISO ou DD/MM/YYYY)
  else if (data.includes("/")) {
    const [d, m, y] = data.split("/");
    dateObj = new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
  } else if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
    dateObj = new Date(`${data.split("T")[0]}T12:00:00`);
  } else {
    const tempDate = new Date(data);
    if (!isNaN(tempDate.getTime())) dateObj = tempDate;
  }

  // Se não conseguiu converter a data, retorna o original
  if (!dateObj || isNaN(dateObj.getTime())) return data;

  // 3. Aplicação do addDays
  if (addDays !== 0) {
    dateObj.setDate(dateObj.getDate() + addDays);
  }

  // --- RETORNOS FORMATADOS ---

  // Formato para Itinerário (Ex: Mar 15)
  if (tipo === "itinerary") {
    return dateObj.toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
    }).replace(".", ""); // Remove ponto se houver
  }

  // Formato Completo (Ex: sábado, 15 de março de 2025)
    if (tipo === "full") {
    const dataFull = dateObj.toLocaleDateString("pt-BR", { 
      weekday: "long", 
      day: "2-digit", 
      month: "long", 
      year: "numeric" 
    });
    // Faz a primeira letra da frase ficar maiúscula
    return dataFull.charAt(0).toUpperCase() + dataFull.slice(1);
  }

  // 🔹 NOVO Formato Short (Ex: Sex, 08 de Mar de 24)
  const diaSemana = dateObj.toLocaleDateString("pt-BR", { weekday: "short" });
  const diaNum = dateObj.toLocaleDateString("pt-BR", { day: "2-digit" });
  const mesAbrev = dateObj.toLocaleDateString("pt-BR", { month: "short" });
  const anoCurto = dateObj.getFullYear().toString().slice(-2);

  // Limpeza de strings (remover pontos que o toLocaleDateString às vezes coloca)
  const semanaFormatada = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1, 3).replace(".", "");
  const mesFormatado = mesAbrev.charAt(0).toUpperCase() + mesAbrev.slice(1, 3).replace(".", "");

  return `${semanaFormatada}, ${diaNum} de ${mesFormatado} de ${anoCurto}`;
}