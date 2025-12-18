export interface DetalhesVoos {
  numero: string;
  horario_partida: string;
  data_completa: string;
  horario_chegada: string;
  aeroporto_origem?: string | null;
  aeroporto_destino?: string | null;
  escala?: string | null;
}

export interface CompanhiasAereas {
  nome: string;
  logo: string;
}

export interface Voos {
  ida: DetalhesVoos;
  volta: DetalhesVoos;
  companhia_aerea: CompanhiasAereas;
}