// Import Components
import AccomodationInfo from '@/components/details/accomodationSection/accomodationInfo';
import ActivitiesInfo from '@/components/details/activitiesSection/activitiesInfo';
import ReviewsDetails from '@/components/reviews/reviewsDetails';
import DescriptionPacket from '@/components/list/descriptionPacket';
import Gallery from '@/components/others/carouselPagination';
import HeaderButtons from '@/components/details/headerButtons';
import { RatingStars } from '@/components/reviews/ratingStars';
import FooterPrice from '@/components/details/footerPrice';

// Import tolls
import { themeColors } from '@/constants/theme';
import { ArrowRightIcon, MapPinIcon, TrophyIcon } from 'phosphor-react-native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { useDetailsLogic } from '@/hooks/detailsHome/useDetailsLogic';
import { FlightSection } from '@/components/details/vooSection/flightSection';
import createStyles from './details.styles'


export default function Details() {
  const { theme, styles } = useThemedStyles(createStyles)

  const { pacoteObj, handleAccomodation, handleAtividades, reviewsUI, handleReviews } = useDetailsLogic();

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
            titleList="Included in the package"
            includeList={pacoteObj.incluso}
          />
        </View>
        <View style={styles.containerInfoMiddle}>
          <View style={styles.containerInfoInclude}>
              <Text style={styles.textInclude}>Included in the Package</Text>

              <View style={styles.containerIncludeFlight}>
                <FlightSection
                  voos={pacoteObj.voos}
                  styles={styles}
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
                  tipo_hotel={pacoteObj.acomodacao.tipo}
                  categoria_hotel={pacoteObj.acomodacao.categoria}
                  nameCity={pacoteObj.destino.nome}
                  nameCountry={pacoteObj.destino.pais}
                  imagemHotel={pacoteObj.acomodacao.imagem_hotel}
                  onPressChangeOption={handleAccomodation}

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
                  onPressChangeOption={handleAtividades}
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
              onPressAllReviews={handleReviews}


              reviews={reviewsUI}

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
            pacote={pacoteObj}
          />
        </View>

      </ScrollView>
    </View>
  );
}


