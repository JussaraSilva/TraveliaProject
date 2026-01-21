import { ReviewUI } from "@/components/ui/reviews/reviewUi";

type ReviewBase =
  | {
      autor: string;
      data: string;
      nota: number;
      comentario: string;
      votos_uteis?: number;
      imagem_perfil: string;
    }
  | {
      usuario: {
        nome: string;
        foto: string;
        cidade: string;
        pais: string;
      };
      data: string;
      estrelas: number;
      comentario: string;
    };

export function adaptReviewsToUI(reviews: ReviewBase[]): ReviewUI[] {
  return reviews.map((review: any) => {
    // 👉 CASO PACOTE
    if ('autor' in review) {
      return {
        autor: review.autor,
        comentario: review.comentario,
        nota: review.nota,
        imagem_perfil: review.imagem_perfil,
        subtitle: review.data,                // 👈 data no subtitle
        footer: `Votos úteis: ${review.votos_uteis}`, // 👈 votos no footer
      };
    }

    // 👉 CASO ACOMODAÇÃO
    return {
      autor: review.usuario.nome,
      comentario: review.comentario,
      nota: review.estrelas,
      imagem_perfil: review.usuario.foto,
      subtitle: `${review.usuario.cidade}, ${review.usuario.pais}`, // 👈 cidade/pais
      footer: review.data,                                          // 👈 data no fim
    };
  });
}
