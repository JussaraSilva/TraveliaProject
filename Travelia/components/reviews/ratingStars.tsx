import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { StarHalfIcon, StarIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  estrelas?: number;
  starsNumber?: number;
  avaliacoes?: number;

}


export function RatingStars({ estrelas = 1, starsNumber, avaliacoes }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const fullStars = Math.floor(estrelas);
  const halfStar = estrelas % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.containerStars}>
          {[...Array(fullStars)].map((_, index) => (
          <StarIcon key={`full-${index}`} size={20} color={themeColors[theme].starYellowColor} weight="fill" />
        ))}
        {halfStar && <StarHalfIcon size={20} color={themeColors[theme].starYellowColor} weight="fill" />}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon key={`empty-${index}`} size={20} color={themeColors[theme].starYellowColor} weight="thin" />
        ))}
      </View>
      <View style={styles.containerReview}>
        <Text style={styles.textReview}>
            {starsNumber}
        </Text>
        <Text style={styles.textAvaliationQuantity}>
          ({avaliacoes} reviews)
        </Text>
      </View>
      
    </View>
  )

}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    containerStars: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    containerReview: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textReview: {
      fontSize: 16,
      fontWeight: "bold",
      color: themeColors[theme].textPrimary,
    },

    textAvaliationQuantity: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },

  })