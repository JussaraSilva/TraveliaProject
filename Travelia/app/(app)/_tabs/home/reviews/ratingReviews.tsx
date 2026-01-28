
import ButtonFilter from '@/components/buttons/buttonFilters'
import HeaderGlobal from '@/components/header/headerGlobal'
import { PercentBarsRating } from '@/components/reviews/ratingDistribuition/percentBarsRating'
import { RatingStars } from '@/components/reviews/ratingStars'
import ReviewsDetails from '@/components/reviews/reviewsDetails'
import { adaptReviewsToUI } from '@/components/utils/adapter/adapterAccomodationReviews'
import { themeColors, ThemeName } from '@/constants/theme'
import { useHotel } from '@/context/hotel/hotelProvider'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import { router } from 'expo-router'

import { CaretLeftIcon,  DotsThreeVerticalIcon } from 'phosphor-react-native'
import { View, StyleSheet, Text, ScrollView } from 'react-native'



export default function Ratingreviews() {
  const { theme, styles } = useThemedStyles(createStyles);
  
  const {hotelSelecionado} = useHotel();

  
  if (!hotelSelecionado) {
    return null; // ou loading / fallback
  }
  
  const reviewsUI = adaptReviewsToUI(hotelSelecionado.reviews);

  const labelFilters = ['All Reviews', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <HeaderGlobal 
              leftIcons={[
                <CaretLeftIcon 
                  key="options" 
                  size={24} 
                  color={themeColors[theme].icon} 
                />
              ]}
              titlePage={'Rating & Reviews'}
              rightIcons={
                [
                  <DotsThreeVerticalIcon 
                    key="options" 
                    size={24} 
                    color={themeColors[theme].icon} 
                  />
                ]
              }
              onPressLeftIcon={
                router.back
              }
              />
        </View>
        <View style={styles.ratingTop}>

          <View style={styles.ratingNoteLeft}>
            <View style={styles.ratingNoteContentText}>
              <Text style={styles.ratingNote}>
                  {hotelSelecionado.avaliacao.estrelas.toFixed(1)}
              </Text>
              <Text style={styles.ratingNoteSeparate}>/</Text>
              <Text style={styles.ratingNoteTotal}>
                  5.0
              </Text>
            </View>
            <View style={styles.ratingNoteContentStars}>
              <RatingStars 
                estrelas={hotelSelecionado.avaliacao.estrelas} 
                avaliacoes={hotelSelecionado.avaliacao.total_avaliacoes} 
                directionStarReview={styles.starReviewContent}
              />
            </View>
          </View>

          <View style={styles.ratingScaleStars}>
              <PercentBarsRating 
                estrelas={hotelSelecionado.avaliacao.estrelas} 
                totalAvaliacoes={hotelSelecionado.avaliacao.total_avaliacoes} 
              />
          </View>
        </View>
        <View style={styles.ratingFilter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
          <ButtonFilter 
            labels={labelFilters}
            activeIndex={0}
            backgroundAtivoStyle={styles.backgroundAtivoStyle}
            activeTextStyle={styles.activeTextStyle}
            onPress={() => {}}
          />
          </ScrollView>

        </View>
        <View style={styles.ratingBottom}>
          <ScrollView style={styles.ratingComments}
            showsVerticalScrollIndicator={false}
          >
            {/* Comentários dos usuários aqui */}
            
            <ReviewsDetails 
              starsNumber={hotelSelecionado.avaliacao.estrelas}
              mediaStars={hotelSelecionado.avaliacao.estrelas}
              totalAvaliacoes={hotelSelecionado.avaliacao.total_avaliacoes}
              reviews={reviewsUI}
              showHeaderReview={false}
            />
          </ScrollView>
        </View>
    </View>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 5,
  },

  header: {
    marginBottom: 10,
  },

  ratingTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10,
    marginBottom: 10,
  },

  ratingNoteLeft: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingNoteContentText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  ratingNote: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  ratingNoteSeparate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  ratingNoteTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors[theme].textSecondary,
  },

  ratingNoteContentStars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  starReviewContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingFilter: {
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: themeColors[theme].borderColor,
    paddingTop: 10,
  },

  backgroundAtivoStyle: {
    backgroundColor: themeColors[theme].realceBlue,
    borderColor: themeColors[theme].realceBlue,
  },

  activeTextStyle: {
    color: themeColors[theme].textButton,
  },



  ratingScaleStars: {
    width: '50%',
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: themeColors[theme].borderColor,
  },

  ratingBottom: {
    flex: 1,
  },

  ratingComments: {
    flex: 1,
  },


})