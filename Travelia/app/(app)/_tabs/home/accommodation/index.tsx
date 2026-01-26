import HeaderGlobal from '@/components/header/headerGlobal';
import Gallery from '@/components/others/carouselPagination';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { CaretLeftIcon, DotsThreeOutlineVerticalIcon, MapPinIcon,  ShareNetworkIcon } from 'phosphor-react-native';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { RatingStars } from '@/components/reviews/ratingStars';
import { useEffect, useState } from 'react';
import AboutSection from '@/components/home/accomodation/screens/aboutSection';
import RoomDetailsSection from '@/components/home/accomodation/screens/roomDetailsSection';
import { adaptReviewsToUI } from '@/components/utils/adapter/adapterAccomodationReviews';
import { router, useLocalSearchParams } from 'expo-router';
import { useHotel } from '@/context/hotel/hotelProvider';



type tabType = 'about' | 'room';


export default function Accomodation() {
  const {theme, styles} = useThemedStyles(createStyles);


  const [activeTab, setActiveTab] = useState<tabType>('about');

  const { hotelId } = useLocalSearchParams<{ hotelId?: string }>();
  const { hotelSelecionado, setHotelById } = useHotel();


    useEffect(() => {
    if (hotelId) {
      setHotelById(Number(hotelId));
    }
  }, [hotelId, setHotelById]);


  if (!hotelSelecionado) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Acomodação não encontrada</Text>
      </View>
    );
  }



  const reviewsUI = adaptReviewsToUI(hotelSelecionado.reviews);

  const handleRatingPress = (rating: number) => {
    // Lógica para lidar com a avaliação pressionada
    router.push({
      pathname: '/(app)/_tabs/home/reviews/ratingReviews',
    });
    

  }




  return (
    <View style={styles.container}>
          <View style={styles.containerHeader}>
              <HeaderGlobal titlePage="Accommodation" 
                leftIcons={[
                  <CaretLeftIcon
                    key="back" 
                    size={30} 
                    color={themeColors[theme].icon} 
                    weight="light" 
                  />]
                }
                rightIcons={[
                  <ShareNetworkIcon
                    key="share" 
                    size={30} 
                    color={themeColors[theme].icon} 
                    weight="light" 
                  />,
                  <DotsThreeOutlineVerticalIcon
                    key="options" 
                    size={30} 
                    color={themeColors[theme].icon} 
                    weight="light" 
                  />
                ]
                }
                onPressLeftIcon={() => {
                  router.back();
                }}          
              />
          </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
          style={styles.scrollPage}
      >

        <View style={styles.containerGallery}>
          <Gallery 
            imagens={[
              ...hotelSelecionado.imagens.quarto, 
              ...hotelSelecionado.imagens.areas_comuns, // quando for um array
              hotelSelecionado.imagens.fachada]} // Se 'fachada' for uma única string (não array)
            />
        </View>

        <View style={styles.containerInfoTop}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              {hotelSelecionado.nome_hotel}
            </Text>
          </View>

          <View style={styles.containerRating}>
            {hotelSelecionado.avaliacao && ( // Se não existe avaliação, não mostra
              <RatingStars
                estrelas={hotelSelecionado.avaliacao.estrelas}
                avaliacoes={hotelSelecionado.avaliacao.total_avaliacoes}
                starsNumber={hotelSelecionado.avaliacao.estrelas}
                onpressReview={handleRatingPress}
              />
            )}
          </View>

          <View style={styles.containerAdress}>
            <MapPinIcon size={20} color={themeColors[theme].realceBlue} weight='light' />
            <Text style={styles.textAdress}
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {hotelSelecionado.localizacao.endereco}
            </Text>
          </View>
        </View>

        <View style={styles.containerButtonDetails}>
            <Pressable style={[
              styles.buttonAbout, 
              activeTab === 'about' && 
              styles.buttonAboutActive
          ]} 
            onPress={() => setActiveTab('about')}>
              <Text style={[
                styles.textButtonAbout, 
                activeTab === 'about' && 
                styles.textButtonAboutActive
              ]}>
                About
              </Text>
            </Pressable>
            <Pressable style={[
              styles.buttonRoomDetails, 
              activeTab === 'room' && 
              styles.buttonRoomDetailsActive
            ]} 
            onPress={() => setActiveTab('room')}>
              <Text style={[
                styles.textButtonRoomDetails, 
                activeTab === 'room' && 
                styles.textButtonRoomDetailsActive
              ]}>
                Room Details
              </Text>
            </Pressable>
        </View>

        <View style={styles.containerTabs}>
          {activeTab === 'about' && hotelSelecionado.quartos.length > 0 && (
            <AboutSection
                descriptionHotel={hotelSelecionado.descricao_hotel}
                instalacoes={hotelSelecionado.servicos_hotel} 
                completeAdress={hotelSelecionado.localizacao.endereco}
                googleMapsUrl={hotelSelecionado.localizacao.google_maps_url}
                estrelas={hotelSelecionado.avaliacao.estrelas}
                estrelasMedia={hotelSelecionado.avaliacao.estrelas}
                totalAvaliacoes={hotelSelecionado.avaliacao.total_avaliacoes}
                reviewsUI={reviewsUI}
            />
          )}
          {activeTab === 'room' && hotelSelecionado.quartos.length > 0 && (
            hotelSelecionado.quartos.map((quarto: any, index: number) => (
              <RoomDetailsSection
                key={index}
                typeRoom={quarto.tipo}
                typeBed={quarto.camas}
                capacidade={quarto.capacidade}
                size={quarto.area_m2}
                amenities={quarto.amenidades_quarto} 
                vista={quarto.vista}
                temVaranda={quarto.varanda}
                temBanheiroPrivativo={quarto.banheiro_privativo} 
                images={hotelSelecionado?.imagens?.quarto || []} 
                
                chuveiro={quarto.banheiro.chuveiro}
                aguaQuente={quarto.banheiro.agua_quente}
                chuveiroType={quarto.banheiro.tipo_chuveiro}
                banheira={quarto.banheiro.banheira}
                pressao={quarto.banheiro.pressao}
                amenitiesBathroom={quarto.banheiro.amenidades}
                descriptionRoom={quarto.descricao}
                
              />
            ))
          )}

        </View>

        

      </ScrollView>
      


    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 10,
    paddingBottom: 10
  },

  containerHeader: {
    width: '100%',
  },

  scrollPage: {
    
    flex: 1,
  },

  containerGallery: {
    flex: 1,
    maxWidth: '100%',
    paddingHorizontal: 10,
    marginTop: 10
  },

  containerInfoTop: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10
  },

  containerTitle: {
    width: '100%',
  },

  textTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
    marginTop: 10,
  },

  containerRating: {
    marginTop: 10,
  },

  containerAdress: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  textAdress: {
    fontSize: 18,
    color: themeColors[theme].textPrimary,
    marginLeft: 5,
  },

  containerButtonDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },

  buttonAbout: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButtonAbout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  buttonRoomDetails: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButtonRoomDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  buttonAboutActive: {
    backgroundColor: themeColors[theme].realceBlue,
  },

  buttonRoomDetailsActive: {
    backgroundColor: themeColors[theme].realceBlue,
  },

  textButtonAboutActive: {
    color: themeColors[theme].textButton,
  },

  textButtonRoomDetailsActive: {
    color: themeColors[theme].textButton,
  },

  containerTabs: {
    width: '100%',
    marginTop: 10,
  },
  




});