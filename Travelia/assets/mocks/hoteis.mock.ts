import { ListaPacotesHotel } from '@/assets/types/accomodationType';

export const hoteisMock: ListaPacotesHotel = [
  {
    id: 1,
    nome_hotel: 'Luxury Water Villa Resort',
    categoria: '5 estrelas',

    localizacao: {
      endereco: 'North Malé Atoll',
      cidade: 'Malé',
      pais: 'Maldivas',
      latitude: 4.1755,
      longitude: 73.5093,
      coordenadas_gmaps: '4.1755, 73.5093',
      google_maps_url: 'https://maps.google.com',
    },

    imagens: {
      fachada: 'https://picsum.photos/800/500',
      quarto: [
        'https://picsum.photos/800/600',
        'https://picsum.photos/801/600',
      ],
      areas_comuns: [
        'https://picsum.photos/802/600',
      ],
    },

    servicos_hotel: ['Wi-Fi', 'Piscina', 'Spa'],
    quartos: [],
    avaliacoes: [],

    informacoes_gerais: {
      check_in: '14:00',
      check_out: '12:00',
      cafe_manha: {
        incluido: true,
        tipo: 'Buffet',
        horario: '06:00 - 10:00',
      },
      wifi: {
        disponivel: true,
        gratuito: true,
        areas: 'Todo o resort',
      },
      idiomas: ['Inglês', 'Português'],
      estacionamento: 'Não disponível',
      pet_friendly: false,
      acessibilidade: 'Bangalôs adaptados',
      politica_cancelamento: 'Até 7 dias antes',
      contato: {
        telefone: '+960 664-0011',
        email: 'reservas@luxury.com',
        website: 'https://luxury.com',
      },
    },
  },
];
