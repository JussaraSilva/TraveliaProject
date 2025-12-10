import FlightDepartReturn from '@/components/cards/flightDepartReturn';
import Gallery from '@/components/others/carouselPagination';
import HeaderButtons from '@/components/others/headerButtons';
import { RatingStars } from '@/components/reviews/ratingStars';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useLocalSearchParams } from 'expo-router';
import { MapPinIcon, TrophyIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function Details() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{ pacote?: string }>();

  const pacoteStr = params.pacote ?? '{}';

  let pacoteObj;
  try {
    pacoteObj = JSON.parse(pacoteStr);
  } catch {
    pacoteObj = {};
  }




  return (
    <View style={styles.container}>
      <HeaderButtons />
      <ScrollView style={styles.containerScroll}>
        <View style={styles.containerInfoPacoteTop}>
          <View style={styles.imagemCapa}>
            <Gallery imagens={pacoteObj.imagens} />
            <View style={styles.iconTop}>
              <TrophyIcon
                size={30}
                color={themeColors[theme].textButton}
                weight='light'
              />
              <Text style={styles.textIconTop}>
                {pacoteObj.avaliacao.pontuacao}
              </Text>
            </View>
          </View>

          <View style={styles.textContainerPacoteInfo}>
            <Text style={styles.nomePacote}>{pacoteObj.nome_pacote}</Text>

            <View style={styles.review}>
              <RatingStars
                estrelas={pacoteObj.avaliacao.estrelas}
                avaliacoes={pacoteObj.avaliacao.total_avaliacoes}
                starsNumber={pacoteObj.avaliacao.estrelas}
              />
            </View>

            <View style={styles.destinoPais}>
              <MapPinIcon
                size={20}
                color={themeColors[theme].realceBlue}
                weight='light'
              />

              <Text style={styles.textDestino}>{pacoteObj.destino.nome},</Text>
              <Text style={styles.textPais}>{pacoteObj.destino.pais}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerInfoMiddle}>
          <View style={styles.containerInfoInclude}>
            <Text style={styles.textInclude}>Included in the Package</Text>
            
              <FlightDepartReturn
                include="Flight"
                direction="Departure"
                dateBoarding={pacoteObj.voos.ida.data_completa}
                airport_origin={pacoteObj.voos.ida.aeroporto_origem}
                hour_boarding={pacoteObj.voos.ida.horario_partida}
                airport_destination={pacoteObj.voos.ida.aeroporto_destino}
                hour_destination={pacoteObj.voos.ida.horario_chegada}
                numero_voo={pacoteObj.voos.ida.numero}
                escala={pacoteObj.voos.ida.escala}
                name_airline={pacoteObj.voos.companhia_aerea.nome}
                logo_airline={pacoteObj.voos.companhia_aerea.logo}
                
              />
              <FlightDepartReturn
                includeStyle={styles.flightReturn}
                direction="Return"
                dateBoarding={pacoteObj.voos.volta.data_completa}
                airport_origin={pacoteObj.voos.ida.aeroporto_destino}
                hour_boarding={pacoteObj.voos.volta.horario_partida}
                airport_destination={pacoteObj.voos.ida.aeroporto_origem}
                hour_destination={pacoteObj.voos.volta.horario_chegada}
                numero_voo={pacoteObj.voos.volta.numero}
                escala={pacoteObj.voos.ida.escala}
                name_airline={pacoteObj.voos.companhia_aerea.nome}
                logo_airline={pacoteObj.voos.companhia_aerea.logo}
                
              />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      flex: 1,
    },

    containerScroll: {
      
      backgroundColor: themeColors[theme].backgroundCard,
      
    },

    containerInfoPacoteTop: {
      width: '100%',
      marginTop: 5,
      alignItems: 'center',
    },

    iconTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: themeColors[theme].recomendedIconBack,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },

    textIconTop: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    imagemCapa: {
      width: 360,
      height: 300,
      borderRadius: 10,
    },

    imagem: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },

    textContainerPacoteInfo: {
      width: '100%',
      marginTop: 5,
      paddingHorizontal: 12,

    },

    nomePacote: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    review: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 10,
    },

    destinoPais: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 10,
    },

    textDestino: {
      fontSize: 20,
      color: themeColors[theme].textPrimary,
    },

    textPais: {
      fontSize: 20,
      color: themeColors[theme].textPrimary,
    },

    containerInfoMiddle: {
      flexDirection: 'column',
      width: '100%',
      marginTop: 5,
      backgroundColor: themeColors[theme].background,
      
    },

    containerInfoInclude: {
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      paddingHorizontal: 12,
    },

    textInclude: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    flightReturn: {
      backgroundColor: "transparent",
    }
  });
