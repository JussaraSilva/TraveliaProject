
import AppPressable from '@/components/buttons/pressable/appPressable';
import MapSection from '@/components/mapsWebview/mapSection';
import ReviewsDetails from '@/components/reviews/reviewsDetails';
import { ReviewUI } from '@/components/ui/reviews/reviewUi';
import { themeColors, ThemeName } from '@/constants/theme';

import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { CaretRightIcon, MapPinIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { IconTextList } from '../components/lists/iconTextList';
import { mapHotelInstallations } from '../constants/mapHotelInstallations';



type Props = {
  descriptionHotel: string,
  instalacoes: string[],
  completeAdress: string,
  googleMapsUrl: string,
  estrelas: number,
  estrelasMedia: number,
  totalAvaliacoes: number,
  reviewsUI?: ReviewUI[],
}



export default function AboutSection({descriptionHotel,instalacoes, completeAdress, googleMapsUrl, estrelas, estrelasMedia, totalAvaliacoes, reviewsUI} : Props) {
  const {theme, styles} = useThemedStyles(createStyles);



  const [isExpanded, setIsExpanded] = useState(false);
  const handleReadMore = () => {
    setIsExpanded(prev => !prev);
  }



  return (
    <View style={styles.container}>
      <View style={styles.containerDescription}>
        <Text style={styles.textTitle}>
          Description
        </Text>
        <View style={styles.containerTextDescription}>
          <Text style={styles.textDescription}
            numberOfLines={isExpanded ? undefined : 4}
            ellipsizeMode='tail'
          >
           {descriptionHotel}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.linkReadMore}
          onPress={handleReadMore}
        >
          <Text style={styles.textReadMore}>
            {isExpanded ? 'Read Less' : 'Read More'}...
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerInstalacoes}>
        <Text style={styles.textTitle}>
          Principais Instalações
        </Text>
        
          <IconTextList 
            items={mapHotelInstallations(instalacoes)}
          />

      </View>

      <View style={styles.containerLocation}>
          <View style={styles.containerLocationTitle}>
            <Text style={styles.textTitle}>
              Location
            </Text>
          </View>

          <View style={styles.containerLocationAdress}>
            <View style={styles.contentLocationAdress}>
              <MapPinIcon
                size={22}
                color={themeColors[theme].realceBlue}
                weight="light"
              />

              <Text style={styles.textLocation}>
                {completeAdress}
              </Text>
            </View>
            <View style={styles.containerMapAdress}>
              <MapSection 
                google_maps_url={googleMapsUrl}
              />
            </View>
          </View>
      </View>

      <View style={styles.containerReviews}>
          <ReviewsDetails
            starsNumber={estrelas}
            mediaStars={estrelasMedia}
            totalAvaliacoes={totalAvaliacoes}

            reviews = {reviewsUI}
          />
      </View>

      <View style={styles.containerPolicies}>
          <AppPressable
              style={styles.containerPoliciesText}
              onPress={() => {
                console.log('Policies clicked');
              }}
            >
              <Text style={styles.textPolicies}>Accomodation Policies</Text>
              <CaretRightIcon
                size={20}
                color={themeColors[theme].icon}
                weight="light"
              />
            </AppPressable>

      </View>
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: themeColors[theme].background,
  },
  containerDescription: {
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderColor,
    paddingBottom: 20,
  },



  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  containerTextDescription: {
    gap: 10,
    width: '100%',
    
  },


  textDescription: {
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },

  linkReadMore: {
    marginTop: 10,

  },

  textReadMore: {
    fontSize: 16,
    color: themeColors[theme].realceBlue,
    textDecorationLine: 'underline',
  },

  containerInstalacoes: {
    paddingTop: 20,
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderColor,
    paddingBottom: 20,

  },


  containerLocation: {
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderColor,
    paddingBottom: 20,
    marginBottom: 30,
  },

  containerLocationTitle: {
    gap: 10,
    paddingTop: 20,
  },

  containerLocationAdress: {
    gap: 10,
    
  },

  contentLocationAdress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  textLocation: {
    fontSize: 14,
    color: themeColors[theme].textPrimary,
  },

  containerMapAdress: {
    width: '100%',
    
  },

  containerReviews: {
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderColor,
    paddingBottom: 20,
  },

  containerPolicies: {
    maxWidth: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },

  containerPoliciesText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    borderRadius: 10,
    padding: 10,
  },

  textPolicies: {
    fontSize: 24,
    fontWeight: 'bold',
  },


  

})

