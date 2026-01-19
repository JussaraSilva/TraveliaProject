
import { AvaliacaoType } from "./avaliacao";
import { ImagemType } from "./imagens";
import { InformacoesGeraisType } from "./informacoesGerais";
import { LocalizacaoType } from "./localizacao";
import { QuartosType } from "./quartos";

export type PacoteHotel = {
  id: number;
  nome_hotel: string;
  categoria: string;
  localizacao: LocalizacaoType;
  imagens:ImagemType;
  servicos_hotel: string[];
  quartos:QuartosType[];
  avaliacoes: AvaliacaoType[];
  informacoes_gerais: InformacoesGeraisType;
}

export type ListaPacotesHotel = PacoteHotel[];