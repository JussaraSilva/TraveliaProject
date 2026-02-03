

export type FuncionamentoAtividadeType = {
  necessita_agendamento: boolean;
  antecedencia_minima: string | null;
  capacidade_maxima?: string | number | null;
}

export default FuncionamentoAtividadeType;