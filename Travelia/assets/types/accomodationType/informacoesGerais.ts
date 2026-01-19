export interface InformacoesGeraisType {
  check_in: string; // "14:00"
  check_out: string; // "12:00"
  cafe_manha: CafeManhaType;
  wifi: WifiType;
  idiomas: string[];
  estacionamento: string;
  pet_friendly: boolean;
  acessibilidade: string;
  politica_cancelamento: string;
  contato: ContatoType;
}

export interface CafeManhaType {
  incluido: boolean;
  tipo: string;
  horario: string;
}

export interface WifiType {
  disponivel: boolean;
  gratuito: boolean;
  areas: string;
}

export interface ContatoType {
  telefone: string;
  email: string;
  website: string;
}