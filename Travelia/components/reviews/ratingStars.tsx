import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { StarHalfIcon, StarIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";

type Props = {
  estrelas?: number;
  starsNumber?: number;
  avaliacoes?: number;
  onpressReview?: (rating:number) => void;
  directionStarReview?: StyleProp<ViewStyle>
}


export function RatingStars({
  estrelas = 1,
  starsNumber,
  avaliacoes,
  onpressReview,
  directionStarReview,
}: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const rating = starsNumber ?? 0;


  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);



  return (
    <TouchableOpacity
      style={[styles.container, directionStarReview]}
      onPress={() => onpressReview?.(estrelas)}
    >
      <View style={styles.containerStars}>
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon
            key={`full-${index}`}
            size={20}
            color={themeColors[theme].starYellowColor}
            weight="fill"
          />
        ))}

        {halfStar && (
          <StarHalfIcon
            size={20}
            color={themeColors[theme].starYellowColor}
            weight="fill"
          />
        )}

        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon
            key={`empty-${index}`}
            size={20}
            color={themeColors[theme].starYellowColor}
            weight="thin"
          />
        ))}
      </View>

      <View style={styles.containerReview}>
        <Text style={styles.textReview}>{rating.toFixed(1)}</Text>
        <Text style={styles.textAvaliationQuantity}>
          ({avaliacoes} reviews)
        </Text>
      </View>
    </TouchableOpacity>
  );
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