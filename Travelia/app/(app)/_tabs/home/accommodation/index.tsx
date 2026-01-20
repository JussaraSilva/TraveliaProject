import HeaderGlobal from '@/components/header/headerGlobal';
import Gallery from '@/components/others/carouselPagination';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { CaretLeftIcon, DotsThreeOutlineVerticalIcon, MapPinIcon,  ShareNetworkIcon } from 'phosphor-react-native';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { hoteis } from '@/assets/data/accomodationData.json';
import { ListaPacotesHotel } from '@/assets/types/accomodationType';
import { RatingStars } from '@/components/reviews/ratingStars';
import { useState } from 'react';
import AboutSection from '@/components/home/accomodation/aboutSection';
import RoomDetailsSection from '@/components/home/accomodation/roomDetailsSection';



type tabType = 'about' | 'room';


export default function Accomodation() {
  const {theme, styles} = useThemedStyles(createStyles);


  const [activeTab, setActiveTab] = useState<tabType>('about');

   // 1. Pegamos o ID da URL
  const { hotelId } = useLocalSearchParams<{ hotelId?: string }>();

  // Busca diretamente no JSON importado
  const hotel = (hoteis as ListaPacotesHotel).find(h => String(h.id) === String(hotelId));

  if (!hotel) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Acomodação não encontrada (ID: {hotelId})</Text>
      </View>
    );
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
              ...hotel.imagens.quarto, 
              ...hotel.imagens.areas_comuns, // quando for um array
              hotel.imagens.fachada]} // Se 'fachada' for uma única string (não array)
            />
        </View>

        <View style={styles.containerInfoTop}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              {hotel.nome_hotel}
            </Text>
          </View>

          <View style={styles.containerRating}>
            {hotel.avaliacao && ( // Se não existe avaliação, não mostra
              <RatingStars
                estrelas={hotel.avaliacao.estrelas}
                avaliacoes={hotel.avaliacao.total_avaliacoes}
                starsNumber={hotel.avaliacao.estrelas}
              />
            )}
          </View>

          <View style={styles.containerAdress}>
            <MapPinIcon size={20} color={themeColors[theme].realceBlue} weight='light' />
            <Text style={styles.textAdress}>
              {hotel.localizacao.endereco}
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
          {activeTab === 'about' && hotel.quartos.length > 0 && (
            <AboutSection
                instalacoes={hotel.servicos_hotel} 
                completeAdress={hotel.localizacao.endereco}
                latitude={hotel.localizacao.latitude}
                longitude={hotel.localizacao.longitude}
            />
          )}
          {activeTab === 'room' && hotel.quartos.length > 0 && (
            <RoomDetailsSection 
              descriptionRoom={hotel.quartos[0].descricao}
            />
          )}
        </View>

      </ScrollView>
      


    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 10,
  },

  containerHeader: {
    width: '100%',
  },

  scrollPage: {
    width: '100%',
  },

  containerGallery: {
    
    width: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  textAdress: {
    fontSize: 16,
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