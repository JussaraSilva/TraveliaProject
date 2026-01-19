export interface AvaliacaoType {
  usuario: UsuarioType;
  estrelas: number;
  data: string;
  avaliacao: string;
  tags: string[];
}


export interface UsuarioType {
  nome: string;
  foto: string;
  cidade: string;
  pais: string;
}