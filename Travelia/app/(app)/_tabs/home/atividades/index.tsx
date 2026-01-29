import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { ArrowRightIcon, CaretLeftIcon, DotsThreeOutlineVerticalIcon, MapPinIcon, ShareNetworkIcon,  SparkleIcon, SunHorizonIcon } from 'phosphor-react-native';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Gallery from '@/components/others/carouselPagination';
import atividadesData from '@/assets/data/atividadesData.json';
import { ListaPacotesAtividades } from '@/assets/types/atividadesType';
import { useBooking } from '@/context/booking/bookingContext';
import { RatingStars } from '@/components/reviews/ratingStars';
import ImageMosaic from '@/components/home/accomodation/components/mosaicImages/imageMosaic';
import { PolicySection } from '@/components/accomodationPolicies/policySection';




export default function Atividades() {

  const { theme, styles } = useThemedStyles(createStyles);
  

  const {pacoteOriginal} = useBooking();

  const { atividadesIds } = useLocalSearchParams();

  const ids: number[] = atividadesIds
    ? JSON.parse(atividadesIds as string).map(Number)
    : [];


  const atividadesSelecionadas: ListaPacotesAtividades =
  atividadesData.atividades.filter((atividade) =>
    ids.includes(atividade.identificacao.id)
  );

  const handleItineraryPress = (atividadeId: number) => {
    // Lógica para lidar com o roteiro pressionado
    router.push(
      {
        pathname: '/(app)/_tabs/home/atividades/itinerary',
        params: { atividadeId: atividadeId.toString() },
      }
    );
    
  };

  





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderGlobal 
          titlePage="Atividades" 
          leftIcons={
            [<CaretLeftIcon
              key="back"
              size={24}
              color={themeColors[theme].icon}
            />]
          }
          rightIcons={[
            <ShareNetworkIcon
              key="share"
              size={24}
              color={themeColors[theme].icon}
            />,
            <DotsThreeOutlineVerticalIcon
              key="options"
              size={24}
              color={themeColors[theme].icon}
            />
          ]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.galleryHeader}>
          <Gallery imagens={[
            ...atividadesSelecionadas[0].midia.imagens, 
            ...atividadesSelecionadas[1].midia.imagens]} />
          <View style={styles.containerInfoTop}>
            <Text style={styles.textTitle}>
              {[atividadesSelecionadas[0].identificacao.nome, 
              atividadesSelecionadas[1].identificacao.nome,
              atividadesSelecionadas[2].identificacao.nome].join(', ')}
            </Text>
          <View style={styles.containerLocation}>
            <MapPinIcon 
              size={20} 
              color={themeColors[theme].realceBlue}
              weight="bold" 
            />
            <Text style={styles.textLocation}>
              {pacoteOriginal?.destino.nome}, {pacoteOriginal?.destino.pais}
            </Text>
          </View>
          </View>
        </View>

        {atividadesSelecionadas.map((atividade) => (
          <View key={atividade.identificacao.id} style={styles.containerNomeAtividade}>
            <Text style={styles.textNomeAtividade}>
              {atividade.identificacao.nome}
            </Text>
            <View style={styles.containerRevies}>
              <RatingStars  
                starsNumber={
                  atividade.avaliacao.nota_media >= 5
                    ? 5
                    : +(atividade.avaliacao.nota_media / 2).toFixed(1)
                }
                estrelas={atividade.avaliacao.nota_media}
                avaliacoes={atividade.avaliacao.quantidade_reviews}
              />

            </View>
            <Text style={styles.textDescricaoAtividade}>
              {atividade.identificacao.categoria}
            </Text>
            <View style={styles.containerInfoAtividade}>
              <Text style={styles.textDescricaoAtividade}>
                {atividade.descricao.descricao_curta}
              </Text>
            </View>
            
            <View style={styles.containerImagens}>
                <ImageMosaic
                  images={atividade.midia.imagens}
                />
            </View>



          </View>
        ))}

        <View style={styles.highlights}>
          <Text style={styles.textTitle}>Trip Highlights</Text>

          <PolicySection
            title="O que esperar dessa jornada"
            iconStyleVariant={styles.iconContainer}
            icon={
              <SunHorizonIcon size={20} weight="bold" color={themeColors[theme].realceBlue} />
            }
            data={atividadesSelecionadas[0].highlights.motivos_principais}
          />

          <PolicySection
            title="Momentos Inesquecíveis"
            iconStyleVariant={styles.iconContainer}
            icon={
              <SparkleIcon size={20} weight="bold" color={themeColors[theme].realceBlue} />
            }
            data={atividadesSelecionadas[0].highlights.experiencias_unicas || []}
          />

          <PolicySection
            title="Paradas Obrigatórias"
            iconStyleVariant={styles.iconContainer}
            icon={
              <MapPinIcon size={20} weight="bold" color={themeColors[theme].realceBlue} />
            }
            data={atividadesSelecionadas[0].highlights.locais_visitados}
          />

        </View>

        <TouchableOpacity style={styles.containerButtonMore}
          onPress={handleItineraryPress.bind(null, atividadesSelecionadas[0].identificacao.id)}
        >
          <View style={styles.buttonMore}>
            <Text style={styles.textButton}>More Info</Text>
          </View>
          <ArrowRightIcon 
            size={24} 
            color={themeColors[theme].icon} 
          />
        </ TouchableOpacity>
      </ScrollView>

      
    </View>
  );
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors[theme].backgroundCard,
      paddingHorizontal: 10,
    },

    header: {
      paddingTop: 16,
    },

    galleryHeader: {
      marginTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
    },

    containerInfoTop: {
      paddingHorizontal: 16,
      marginTop: 16,
    },

    textTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: themeColors[theme].textPrimary,
    },

    containerLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 8,
    },

    textLocation: {
      fontSize: 20,
      color: themeColors[theme].textSecondary,
      marginTop: 4,
    },

    containerNomeAtividade: {
      paddingHorizontal: 16,
      marginTop: 24,
    },

    textNomeAtividade: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors[theme].textPrimary,
    },

    containerRevies: {
      marginTop: 8,
    },

    textDescricaoAtividade: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
      marginTop: 8,
    },

    containerInfoAtividade: {
      marginTop: 8,
    },

    containerImagens: {
      marginTop: 16,
    },

    highlights: {
      paddingHorizontal: 16,
      marginTop: 32,
      marginBottom: 32,
    },

    textTitleHighlights: {
      fontSize: 22,
      fontWeight: '700',
      color: themeColors[theme].textPrimary,
      marginBottom: 16,
    },

    highlightItem: {
      marginBottom: 8,
    },

    highlightText: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
    },

    iconContainer: {
      marginRight: 8,
      backgroundColor: "transparent",
      padding: 6,
      borderRadius: 6,
    },

    containerButtonMore: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: themeColors[theme].borderColor,
      marginBottom: 16,
    },

    buttonMore: {
      alignItems: 'center',
    },

    textButton: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors[theme].textPrimary,
    },

  });