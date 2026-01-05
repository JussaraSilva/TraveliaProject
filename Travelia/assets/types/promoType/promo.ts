export interface PromoType {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  codigo: string;
  validade: string;
  valor_minimo: number | string;
  tipo_desconto: string;
  valor_desconto: number | string;
  aplicacao: string;
  instrucoes: string;
  termos_condicoes: string[];
  outras_informacoes: string[];
}


