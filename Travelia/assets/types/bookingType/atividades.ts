export interface Atividades {
  nome: string;
  duracao: string;
  horario: string;
  dificuldade: 'Fácil' | 'Moderada' | 'Difícil' | 'Nenhuma'; // Exemplo de tipo literal;
  incluso: boolean;
  preco_extra?: number;
  id_atividade: number;
}