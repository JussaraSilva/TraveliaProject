import { fakeRatingDistribution } from "@/components/utils/ratingCalcFake/fakeRatingDistribution";
import { themeColors, ThemeName } from "@/constants/theme";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { StarIcon } from "phosphor-react-native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

type BarsRatingProps = {
  estrelas: number;
  totalAvaliacoes: number;
}




export function PercentBarsRating({estrelas, totalAvaliacoes}: BarsRatingProps)  {


  const {theme, styles} = useThemedStyles(createStyles);


  const distribuicao = fakeRatingDistribution(estrelas, totalAvaliacoes);

  const stars = [5, 4, 3, 2, 1] as const;


  return (

    <View style={styles.container}>

      {stars.map((star) => {
        const quantidade = distribuicao[star] || 0;
        const porcentagem = (quantidade / totalAvaliacoes) * 100;
        return (
          <View key={star} style={styles.percentBars}>
            <View style={styles.starIcon}>
              <StarIcon 
                size={16} 
                color={themeColors[theme].starYellowColor}
                weight="fill"
                />
            </View>
        <View style={styles.containerTextNote}>
          <Text style={styles.textNote}>
            {star}
          </Text>
        </View>

        <View style={styles.barContainer}>
          <View style={[styles.barFill, { width: `${porcentagem}%` }]} />
        </View>

        <View style={styles.containerQuantityText}>
          <Text style={styles.ratingQuantityText}>
            {quantidade}
          </Text>
        </View>

      </View>
        );
      })}

    </View>
  );
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    width: '100%',
  },

  percentBars: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  starIcon: {
    marginRight: 5,
  },

  containerTextNote: {
    width: 20,
    marginRight: 5,
  },

  textNote: {
    fontWeight: 'bold',
  },

  barContainer: {
    flex: 1,
    height: 5,
    backgroundColor: themeColors[theme].borderColor,
    borderRadius: 5,
  },
  barFill: {
    height: '100%',
    backgroundColor: themeColors[theme].realceBlue,
    borderRadius: 5,
  },

  containerQuantityText: {
    width: 30,
    textAlign: 'right',
    marginLeft: 5,
  },

  ratingQuantityText: {
    fontWeight: 'bold',
  },



});