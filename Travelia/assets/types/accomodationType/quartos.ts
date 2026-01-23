export interface QuartosType {
  tipo: string,
  descricao: string,
  area_m2: number,
  capacidade: string,
  camas: string,
  vista: string,
  varanda: boolean | string,
  banheiro_privativo: boolean,
  amenidades_quarto:string[];
  banheiro: BanheiroType;
}

export interface BanheiroType {
  chuveiro: string,
  tipo_chuveiro: string,
  banheira: string,
  agua_quente: boolean,
  pressao: string,
  amenidades: string
}


