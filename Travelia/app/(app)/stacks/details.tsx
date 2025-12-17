// Import Components
import AccomodationInfo from '@/components/details/accomodationInfo';
import ActivitiesInfo from '@/components/details/activitiesInfo';
import FlightDepartReturn from '@/components/details/flightDepartReturn';
import ReviewsDetails from '@/components/reviews/reviewsDetails';
import DescriptionPacket from '@/components/list/descriptionPacket';
import Gallery from '@/components/others/carouselPagination';
import HeaderButtons from '@/components/details/headerButtons';
import { RatingStars } from '@/components/reviews/ratingStars';
import FooterPrice from '@/components/details/footerPrice';

// Import tolls
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useLocalSearchParams } from 'expo-router';
import { ArrowRightIcon, MapPinIcon, TrophyIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

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

          <DescriptionPacket
            descriptionPacket={pacoteObj.destino.descricao}
            includeList={pacoteObj.incluso}
          />
        </View>
        <View style={styles.containerInfoMiddle}>
          <View style={styles.containerInfoInclude}>
              <Text style={styles.textInclude}>Included in the Package</Text>

              <View style={styles.containerIncludeFlight}>
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

              <View style={styles.containerIncludeAccomodation}>
                <AccomodationInfo
                  include="Accommodation"
                  includeStyle={styles.accomodation}
                  checkIn={pacoteObj.estadia.checkin}
                  checkOut={pacoteObj.estadia.checkout}
                  noites={pacoteObj.estadia.noites}
                  name_hotel={pacoteObj.acomodacao.nome_hotel}
                  categoria_hotel={pacoteObj.acomodacao.categoria}
                  nameCity={pacoteObj.destino.nome}
                  nameCountry={pacoteObj.destino.pais}
                  imagemHotel={pacoteObj.acomodacao.imagem_hotel}
                />
              </View>

              <View style={styles.containerIncludeActivity}>
                <ActivitiesInfo
                  include="Activities"
                  includeStyle={styles.activities}
                  checkIn={pacoteObj.estadia.checkin}
                  checkOut={pacoteObj.estadia.checkout}
                  duracao={pacoteObj.duracao.dias}
                  nome_pacote={pacoteObj.nome_pacote}
                  atividades={pacoteObj.atividades}
                  quantidade_pessoas={pacoteObj.viajantes.quantidade}
                  tipo={pacoteObj.viajantes.tipo}
                  idade_minima={pacoteObj.viajantes.idade_minima}
                />
              </View>
          </View>

          <View style={styles.containerTermsConditions}>
            <View style={styles.containerTextTermsConditions}>
              <Text style={styles.textTermsConditions}>
                Terms & Conditions
              </Text>
              <TouchableOpacity style={styles.containerArrowMore}>
                <ArrowRightIcon size={20} color={themeColors[theme].realceBlue} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerReviews}>
            <ReviewsDetails
              starsNumber={pacoteObj.avaliacao.estrelas}
              mediaStars={pacoteObj.avaliacao.estrelas}
              totalAvaliacoes={pacoteObj.avaliacao.total_avaliacoes}

              reviews = {pacoteObj.reviews}

            />
          </View>

        </View>

        <View style={styles.containerInfoFooter}>
          <FooterPrice 
            destino={pacoteObj.destino.nome}
            dataSaida={pacoteObj.voos.ida.data_completa}
            dataRetorno={pacoteObj.voos.volta.data_completa}
            passengers={pacoteObj.viajantes.quantidade}
            total_price={pacoteObj.preco.total}
            parcelamento={pacoteObj.preco.parcelamento}
            moeda={pacoteObj.preco.moeda}
          />
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

    containerIncludeFlight: {
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      paddingHorizontal: 12,
    },

    containerIncludeAccomodation: {
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
    },

    accomodation: {
      backgroundColor: themeColors[theme].colorRed,
    },

    containerIncludeActivity: {
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      paddingHorizontal: 12,
    },

    activities: {
      backgroundColor: themeColors[theme].colorRed,
    },

    containerTermsConditions: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].background,
      marginTop: 10,
      paddingHorizontal: 20,
    },

    containerTextTermsConditions: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 5,
    },

    textTermsConditions: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerArrowMore: {
      padding: 10,
    },

    containerReviews: {
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      paddingHorizontal: 20,
    },

    containerInfoFooter: {
      flexDirection: 'column',
      backgroundColor: themeColors[theme].backgroundCard,
      marginTop: 5,
      width: '100%',
      
    },

    
    


  });
