import { ReviewUI } from "@/components/ui/reviews/reviewUi";
import { adaptReviewsToUI } from "@/components/utils/adapter/adapterAccomodationReviews";
import { PacoteViagem } from "@/assets/types/bookingType";
import { PacoteHotel } from '@/assets/types/accomodationType';

export type RatingSourceUI = {
  avaliacao: {
    estrelas: number;
    totalAvaliacoes: number;
  };
  reviews: ReviewUI[];
};


function adaptHotelToRatingUI(hotel: PacoteHotel): RatingSourceUI {
  return {
    avaliacao: {
      estrelas: hotel.avaliacao.estrelas,
      totalAvaliacoes: hotel.avaliacao.total_avaliacoes,
    },
    reviews: adaptReviewsToUI(hotel.reviews ?? []),
  };
}

export { adaptHotelToRatingUI };


function adaptPacoteToRatingUI(pacote: PacoteViagem): RatingSourceUI {
  return {
    avaliacao: {
      estrelas: pacote.avaliacao.estrelas,
      totalAvaliacoes: pacote.avaliacao.total_avaliacoes,
    },
    reviews: adaptReviewsToUI(pacote.reviews ?? []),
  };
}

export { adaptPacoteToRatingUI };
