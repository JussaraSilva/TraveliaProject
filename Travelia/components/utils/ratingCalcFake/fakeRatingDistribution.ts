type RatingDistribution = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

export function fakeRatingDistribution(mediaEstrelas: number, totalAvaliacoes: number = 1000): RatingDistribution {


  if (mediaEstrelas >= 4.5) {
    const distribuicao: RatingDistribution = {
      5: Math.floor(totalAvaliacoes * 0.50),
      4: Math.floor(totalAvaliacoes * 0.25),
      3: Math.floor(totalAvaliacoes * 0.15),
      2: Math.floor(totalAvaliacoes * 0.05),
      1: Math.floor(totalAvaliacoes * 0.02),
    };

    const soma = Object.values(distribuicao).reduce((a, b) => a + b, 0);
    distribuicao[5] += totalAvaliacoes - soma;

    return distribuicao;

    
  } else if (mediaEstrelas >= 3.5) {
    const distribuicao: RatingDistribution = {
      5: Math.floor(totalAvaliacoes * 0.40),
      4: Math.floor(totalAvaliacoes * 0.30),
      3: Math.floor(totalAvaliacoes * 0.20),
      2: Math.floor(totalAvaliacoes * 0.05),
      1: Math.floor(totalAvaliacoes * 0.05),
    };

    const soma = Object.values(distribuicao).reduce((a, b) => a + b, 0);
    distribuicao[5] += totalAvaliacoes - soma;

    return distribuicao;
  } else if (mediaEstrelas >= 2.5) {
    const distribuicao: RatingDistribution = {
      5: Math.floor(totalAvaliacoes * 0.30),
      4: Math.floor(totalAvaliacoes * 0.25),
      3: Math.floor(totalAvaliacoes * 0.25),
      2: Math.floor(totalAvaliacoes * 0.10),
      1: Math.floor(totalAvaliacoes * 0.10),
    };

    const soma = Object.values(distribuicao).reduce((a, b) => a + b, 0);
    distribuicao[5] += totalAvaliacoes - soma;

    return distribuicao;
  } else {
    const distribuicao: RatingDistribution = {
      5: Math.floor(totalAvaliacoes * 0.10),
      4: Math.floor(totalAvaliacoes * 0.15),
      3: Math.floor(totalAvaliacoes * 0.25),
      2: Math.floor(totalAvaliacoes * 0.25),
      1: Math.floor(totalAvaliacoes * 0.25),
    };

    const soma = Object.values(distribuicao).reduce((a, b) => a + b, 0);
    distribuicao[5] += totalAvaliacoes - soma;

    return distribuicao;
  }

}
