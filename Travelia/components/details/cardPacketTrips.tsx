import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


import { PacoteViagem } from "@/assets/types/bookingType";
import { HeartIcon, StarIcon, TrophyIcon } from 'phosphor-react-native';
import { router } from "expo-router";


interface Props {
  pacote: PacoteViagem;
}

export default function CardPacketTrips({pacote}: Props) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const enviarDados = () => {
    router.push({
      pathname: "/(app)/_tabs/home/details",
      params: { pacote: JSON.stringify(pacote) }
    });
  };



  return (
    <View style={styles.containerCard}>
    <TouchableOpacity style={styles.containerTouch}
      onPress={enviarDados}>
      <View style={styles.containerImage}>
        <View style={styles.containerIconTopLeft}>
          <TrophyIcon 
            size={30} 
            color={themeColors[theme].textButton} 
            weight="light" 
          />
          <Text style={styles.textPontuacao}>
            {pacote.avaliacao.pontuacao}
          </Text>
        </View>
        <View style={styles.containerIconTopRight}>
          <TouchableOpacity style={styles.containerHeart}>
            <HeartIcon 
              size={30} 
              color={themeColors[theme].textButton} 
              weight="duotone" 
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: pacote.imagens[0]}}
          style={styles.imagemCapa}>
        </Image>
        <View style={styles.containerImageBottom}>
          <View style={styles.containerStarRate}>
            <StarIcon 
              size={20} 
              color={themeColors[theme].starYellowColor} 
              weight="fill" 
            />
            <Text style={styles.textStarRate}>
              {pacote.avaliacao.estrelas}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.nomeDestino}>
          {pacote.nome_pacote}
          </Text>
        <View style={styles.containerValorViagem}>
          <Text style={styles.precoTotal}>
            {pacote.preco.parcelamento}
          </Text>
          <View style={styles.duracaoTemporada}>
            <Text style={styles.textTemporada}>
              {pacote.duracao.temporada}
            </Text>
          </View>
          
        </View>
      </View>
      

    <View>
      
    </View>

    </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerCard: {
      width: 300,
      height: 420,
      borderRadius: 8,
      backgroundColor: themeColors[theme].backgroundCard,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      margin: 10,
    },



    containerTouch: {
      width: '100%',
      height: '100%',
    },

    containerImage: {
      width: '100%',
      height: 300,
    },



    imagemCapa: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },

    containerIconTopLeft: {
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

    
    textPontuacao: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    containerIconTopRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(207, 205, 205, 0.589)',
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },

    containerHeart: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },

    containerImageBottom: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(31, 31, 31, 0.637)',
      borderTopLeftRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },

    containerStarRate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },

    textStarRate: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },


    containerText: {
      padding: 10,
    },

    nomeDestino: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerValorViagem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      marginTop: 10,
    },

    precoMoeda: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].realceBlue,
    },

    precoTotal: {
      fontSize: 18,
      color: themeColors[theme].realceBlue,
      gap: 10,
      fontWeight: 'bold',
      
    },

    duracaoTemporada: {
      padding:10,
    },

    textTemporada: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
      fontWeight: 'bold',
    },


  });