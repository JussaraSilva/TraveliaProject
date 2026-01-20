export interface ReviewType {
  usuario: UsuarioType;
  estrelas: number;
  data: string;
  comentario: string;
  tags: string[];
}


export interface UsuarioType {
  nome: string;
  foto: string;
  cidade: string;
  pais: string;
}