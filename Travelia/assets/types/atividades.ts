export interface Atividades {
  nome: string;
  duracao: string;
  dificuldade: 'Fácil' | 'Moderada' | 'Difícil' | 'Nenhuma'; // Exemplo de tipo literal;
  incluso: boolean;
  preco_extra?: number;
}