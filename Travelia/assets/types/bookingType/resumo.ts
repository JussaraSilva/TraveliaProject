
export interface GuiaTuristico {
  nome: string;
  especialidade: string;
  anos_experiencia: number;
  imagem: string;
}

export interface Resumo {
  quantidade_voos: number;
  quantidade_atividades: number;
  quantidade_acomodacoes: number;
  guia_turistico: GuiaTuristico; 
}
