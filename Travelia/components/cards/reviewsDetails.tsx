import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RatingStars } from '../reviews/ratingStars';
import {  ArrowRightIcon } from 'phosphor-react-native';

type Props = {
  starsNumber: number;
  mediaStars: number;
  totalAvaliacoes: number;
}

export default function ReviewsDetails({starsNumber, mediaStars, totalAvaliacoes}: Props) {

  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);



  return (
    <View style={styles.container}>
        <View style={styles.reviewsCard}>
          <View style={styles.reviewsHeaderContent}>
            <Text style={styles.reviewsHeaderTitle}>
              Reviews ({totalAvaliacoes})</Text>
            <RatingStars 
                estrelas={mediaStars}
                starsNumber={starsNumber}
                avaliacoes={totalAvaliacoes}
            />
          </View>
          <TouchableOpacity style={styles.reviewsHeaderButton}>
            <Text style={styles.reviewsHeaderButtonText}>Ver Tudo</Text>
            <ArrowRightIcon size={20} color={themeColors[theme].realceBlue} weight="light" />
          </TouchableOpacity>
            
          
        <View style={styles.reviewsContent}>
            <View style={styles.reviewsHeaderContainer}>
                <View style={styles.headerProfile}>
                  <View style={styles.imageProfileContainer}>
                    <Image source={{uri:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'}} 
                    style={styles.imageProfile} />
                  </View>
                  <View style={styles.containerTextHeader}>
                    <Text style={styles.textName}>John Doe</Text>
                    <Text style={styles.textDate}>1 dia atrás</Text>
                  </View>
                    
                </View>
            </View>
        </View>
        </View>

    </View>
  );
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
      flexDirection: 'column',
      width: "100%",
      marginTop: 10,
      
  },

  reviewsCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: themeColors[theme].backgroundCard,
    maxWidth: "100%",
    borderRadius: 8,
  },

  reviewsHeaderContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "70%",
    gap: 10,
    
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
    gap: 10,
    backgroundColor: themeColors[theme].backgroundCard,
    width: "20%",
  },

  reviewsHeaderButtonText: {
    color: themeColors[theme].realceBlue,
  },

  reviewsContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: themeColors[theme].borderColor,
    justifyContent: 'flex-start',
    width: "100%",
    gap: 10,
    marginTop: 10,
  }, 

  reviewsHeaderContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    gap: 10,
    marginTop: 10,
  },



  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },

  imageProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  containerTextHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  textDate: {
    fontSize: 12,
    color: themeColors[theme].textPrimary,
  },
  
})

