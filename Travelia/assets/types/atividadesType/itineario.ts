
export type AgendaPadraoType = {
  dia_referencial: string;
  horario: string;
  descricao: string;
};

export type ItinerarioAtividadeType = {
  tipo: string;
  descricao_geral: string;
  agenda_padrao: AgendaPadraoType[];
};



export default ItinerarioAtividadeType;