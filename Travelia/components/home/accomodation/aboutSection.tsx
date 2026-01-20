import MapSection from '@/components/mapsWebview/mapSection';
import { themeColors, ThemeName } from '@/constants/theme';
import { detectInstallationCategory } from '@/hooks/config/detectInstallationCategory';
import { INSTALLATIONS_MAP } from '@/hooks/config/instalations.config';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { MapPinIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  instalacoes: string[],
  completeAdress: string,
  latitude: number,
  longitude: number,
}



export default function AboutSection({instalacoes, completeAdress, latitude, longitude} : Props) {
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
                latitude={latitude} 
                longitude={longitude} 
              />
            </View>
          </View>
      </View>
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderColor,
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
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },

  containerMapAdress: {
    width: '100%',
    
  },


  

})

