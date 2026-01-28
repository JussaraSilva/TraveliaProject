
import {IdentificacaoAtividadeType } from './identificacao';
import {DescricaoAtividadeType} from './descricao';
import { AvaliacaoAtividadeType } from './avaliacao';
import { MidiaAtividadesType } from './midia';
import {HighlightsAtividadeType} from './highlights';
import {ItinerarioAtividadeType} from './itineario';
import {FuncionamentoAtividadeType} from './funcionamento';
import {TermosAtividadeType} from './termos';


export type PacoteAtividades = {
  identificacao: IdentificacaoAtividadeType;
  descricao: DescricaoAtividadeType;
  avaliacao: AvaliacaoAtividadeType;
  midia: MidiaAtividadesType;
  highlights: HighlightsAtividadeType;
  itinerario: ItinerarioAtividadeType;
  funcionamento: FuncionamentoAtividadeType;
  termos: TermosAtividadeType;
};

export type ListaPacotesAtividades = PacoteAtividades[];