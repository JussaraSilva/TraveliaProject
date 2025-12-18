
export interface Review {
  autor: string;
  data: string;
  nota: number;
  comentario: string;
  votos_uteis: number;
}
export interface Avaliacao {
  pontuacao: number;
  total_avaliacoes: number;
  estrelas: number;
  destaque: string;

  reviews?:Review[];
}