
import { ReviewType } from "./reviews";
import { ImagemType } from "./imagens";
import { InformacoesGeraisType } from "./informacoesGerais";
import { LocalizacaoType } from "./localizacao";
import { QuartosType } from "./quartos";
import { AvaliacaoType } from "./avaliacao";
import { AccommodationPoliciesType } from "./accommodationPolicies";

export type PacoteHotel = {
  id: number;
  nome_hotel: string;
  descricao_hotel: string;
  categoria: string;
  localizacao: LocalizacaoType;
  imagens:ImagemType;
  servicos_hotel: string[];
  quartos:QuartosType[];
  avaliacao: AvaliacaoType;
  reviews: ReviewType[];
  informacoes_gerais: InformacoesGeraisType;
  accommodation_policies: AccommodationPoliciesType;
}

export type ListaPacotesHotel = PacoteHotel[];