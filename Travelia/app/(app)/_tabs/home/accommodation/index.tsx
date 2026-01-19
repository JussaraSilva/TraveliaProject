import HeaderGlobal from '@/components/header/headerGlobal';
import Gallery from '@/components/others/carouselPagination';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { CaretLeftIcon, DotsThreeOutlineVerticalIcon, ShareNetworkIcon } from 'phosphor-react-native';
import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { hoteis } from '@/assets/data/accomodationData.json';
import { ListaPacotesHotel } from '@/assets/types/accomodationType';





export default function Accomodation() {
  const {theme, styles} = useThemedStyles(createStyles);

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

      <View style={styles.containerGallery}>

          <Gallery 
            imagens={[
              ...hotel.imagens.quarto, 
              ...hotel.imagens.areas_comuns, // quando for um array
              hotel.imagens.fachada]} // Se 'fachada' for uma única string (não array)
            />
          <Text> {hotel.nome_hotel}</Text>
      </View>


    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].background,
  },

  containerHeader: {
    width: '100%',
  },

  containerGallery: {
    flex: 1,
    width: '100%',
  },
});