export interface DetalhesVoos {
  numero: string;
  horario_partida: string;
  horario_chegada: string;
  aeroporto_origem?: string | null;
  aeroporto_destino?: string | null;
  escala?: string | null;
}

export interface Voos {
  ida: DetalhesVoos;
  volta: DetalhesVoos;
}