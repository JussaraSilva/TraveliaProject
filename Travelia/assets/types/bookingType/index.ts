import { Voos } from './voos';
import { Acomodacao } from "./acomodacao";
import { Atividades } from "./atividades";
import { Avaliacao } from "./avaliacao";
import { Destino } from "./destino";
import { Duracao } from "./duracao";
import { Preco } from "./preco";
import { Viajantes } from "./viajantes";
import { Estadia } from './estadia';
import { Resumo } from './resumo';




export interface PacoteViagem {
  id:number;
  ranking:number;
  nome_pacote: string;
  resumo: Resumo;
  destino: Destino;
  preco: Preco;
  duracao: Duracao;
  disponibilidade: {
    vagas: number;
    datas_disponiveis: string[]
  }
  acomodacao: Acomodacao;
  estadia:Estadia;
  atividades: Atividades[];
  avaliacao: Avaliacao; // Inclui (reviews)
  viajantes: Viajantes;
  voos: Voos;
  incluso:string[];
  tags:string[];
  imagens: string[];

  

}

export interface DadosViagem {
  pacotes: PacoteViagem[];
}