import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RatingStars } from './ratingStars';
import {
  ArrowRightIcon,
  DotsThreeVerticalIcon,
  StarIcon,
} from 'phosphor-react-native';
import { ReviewUI } from '../ui/reviews/reviewUi';




type Props = {
  starsNumber: number;
  mediaStars: number;
  totalAvaliacoes: number;
  reviews?: ReviewUI[];
  showHeaderReview?: boolean;
};

export default function ReviewsDetails({
  starsNumber,
  mediaStars,
  totalAvaliacoes,
  reviews = [],
  showHeaderReview = true,
}: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.reviewsCard}>
        {showHeaderReview && (
          <View style={styles.reviewsHeaderContent}>
            <View style={styles.headerText}>
              <Text style={styles.reviewsHeaderTitle}>
                Reviews ({totalAvaliacoes})
              </Text>
              <RatingStars
                estrelas={mediaStars}
                starsNumber={starsNumber}
                avaliacoes={totalAvaliacoes}
              />
            </View>
            <TouchableOpacity style={styles.reviewsHeaderButton}>
              <Text style={styles.reviewsHeaderButtonText}>Ver Tudo</Text>
              <ArrowRightIcon
                size={20}
                color={themeColors[theme].realceBlue}
                weight='light'
              />
            </TouchableOpacity>
          </View>
        )}

        {reviews.map ((review, index) => (
          <View
            key={index}
          style={styles.reviewsContent}>
            <View style={styles.headerProfile}>
              <View style={styles.header}>
                <View style={styles.containerContentHeader}>
                  <View style={styles.profilePictureContainer}>
                    <Image
                      source={{uri: review.imagem_perfil}}
                        style={styles.profilePicture}
                    />
                  </View>
                  <View style={styles.containerNameHeader}>
                    <Text style={styles.textName}>{review.autor}</Text>
                    {review.subtitle && (
                      <Text style={styles.subTextDate}>{review.subtitle}</Text>
                    )}
                  </View>
                  <View style={styles.containerHeaderIcons}>
                    <View style={styles.iconsBack}>
                      <StarIcon
                        size={30}
                        color={themeColors[theme].starYellowColor}
                        weight='duotone'
                      />
                      <View>
                        <Text style={styles.textRating}>{review.nota}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.buttonMore}>
                      <DotsThreeVerticalIcon
                        size={30}
                        color={themeColors[theme].icon}
                        weight='light'
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.reviewsTextContainer}>
                  <View style={styles.reviewsText}>
                    <Text style={styles.textReview}>
                    {review.comentario}
                    </Text>
                  </View>
                  <View style={styles.reviewsVotos}>
                    {review.footer && (
                      <Text style={styles.textVotos}>{review.footer}</Text>
                    )}
                  </View>
            </View>
            
        </View>
          ))}
        

      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '100%',
      marginBottom: 10,
    },

    reviewsCard: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      maxWidth: '100%',
      borderRadius: 8,
    },

    reviewsHeaderContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
      width: '100%',
      gap: 10,
      paddingBottom: 10,
    },

    headerText: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },

    reviewsHeaderTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    reviewsHeaderButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      width: '20%',
    },

    reviewsHeaderButtonText: {
      color: themeColors[theme].realceBlue,
    },

    reviewsContent: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      gap: 10,
      marginTop: 10,
      
    },

    headerProfile: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1,
  },

  containerContentHeader: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  containerNameHeader: {
    flexDirection: 'column',
    width: '50%',
    wordWrap: 'wrap',
    alignSelf: 'flex-start',
    gap: 5,
  },


  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  subTextDate: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  containerHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxWidth: "20%",
    gap: 10,
  },

  iconsBack: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    gap: 5,
    justifyContent: 'center',
  },

  textLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  textRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  buttonMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reviewsTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: themeColors[theme].borderColor,
  },

  reviewsText: {
    marginTop: 10,
  },

  textReview: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  reviewsVotos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
  },

  textVotos: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },


  });
