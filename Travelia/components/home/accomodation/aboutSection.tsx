
import AppPressable from '@/components/buttons/pressable/appPressable';
import MapSection from '@/components/mapsWebview/mapSection';
import ReviewsDetails from '@/components/reviews/reviewsDetails';
import { ReviewUI } from '@/components/ui/reviews/reviewUi';
import { themeColors, ThemeName } from '@/constants/theme';
import { detectInstallationCategory } from '@/hooks/config/detectInstallationCategory';
import { INSTALLATIONS_MAP } from '@/hooks/config/instalations.config';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { CaretRightIcon, MapPinIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


type Props = {
  instalacoes: string[],
  completeAdress: string,
  googleMapsUrl: string,
  estrelas: number,
  estrelasMedia: number,
  totalAvaliacoes: number,
  reviewsUI?: ReviewUI[],
}



export default function AboutSection({instalacoes, completeAdress, googleMapsUrl, estrelas, estrelasMedia, totalAvaliacoes, reviewsUI} : Props) {
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
            Situado nas águas cristalinas do Atol de Malé Norte, este resort de luxo redefine o conceito de fuga paradisíaca. Cada villa overwater foi meticulosamente projetada para oferecer privacidade absoluta e vistas deslumbrantes do Oceano Índico. Com arquitetura que harmoniza modernidade e tradição maldiva, o resort oferece uma experiência imersiva onde o mar se torna extensão do seu espaço de vida. Serviço personalizado 24 horas garante que cada desejo seja atendido, desde jantares privativos na varanda até sessões de spa com vista para o horizonte infinito.
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
        <View style={styles.contentInstalacoes}>
          {instalacoes.map((instalacao, index) => {
            const category = detectInstallationCategory(instalacao);
            const Icon = INSTALLATIONS_MAP[category].icon;

            return (
              <View key={index} style={styles.containerInstalacao}>
                <View style={styles.iconInstalacao}>
                  {<Icon
                    size={22}
                    color={themeColors[theme].realceBlue}
                    weight="light"
                  />}
                </View>

                

                <Text style={styles.textInstalacao}
                  numberOfLines={3}
                  ellipsizeMode='tail'
                >
                  {instalacao}
                </Text>
              </View>
            );
          })}
        </View>

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
    paddingTop: 20

  },

  contentInstalacoes: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
    gap:20,
  },

  containerInstalacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '45%', // 👈 duas colunas
},

  textInstalacao: {
    flex: 1,
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },

  iconInstalacao: {
    backgroundColor: themeColors[theme].realceLightBlue,
    borderRadius: 50,
    padding: 10,
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

