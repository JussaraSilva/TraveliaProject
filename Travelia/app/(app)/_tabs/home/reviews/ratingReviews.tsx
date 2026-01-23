import HeaderGlobal from '@/components/header/headerGlobal'
import { RatingStars } from '@/components/reviews/ratingStars'
import { themeColors, ThemeName } from '@/constants/theme'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import { CaretLeftIcon,  DotsThreeVerticalIcon } from 'phosphor-react-native'
import { View, StyleSheet, Text } from 'react-native'



export default function Ratingreviews() {
  const { theme, styles } = useThemedStyles(createStyles)


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
              />
        </View>
        <View style={styles.ratingTop}>

          <View style={styles.ratingNoteLeft}>
            <View style={styles.ratingNoteContentText}>
              <Text style={styles.ratingNote}>
                  4.8
              </Text>
              <Text style={styles.ratingNoteSeparate}>/</Text>
              <Text style={styles.ratingNoteTotal}>
                  5.0
              </Text>
            </View>
            <View style={styles.ratingNoteContentStars}>
              <RatingStars estrelas={4.8} avaliacoes={1000} 
                directionStarReview={styles.starReviewContent}
              />
            </View>
          </View>

          <View style={styles.ratingScaleStars}>
              
          </View>
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
    marginBottom: 20,
  },

  ratingTop: {
    width: '50%',
    flexDirection: 'column',
    backgroundColor: themeColors[theme].background,
    padding: 10,
  },

  ratingNoteLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingNoteContentText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  },

  ratingScaleStars: {
    width: '50%',

  },


})