import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";


import { PacoteViagem } from "@/assets/types/index";


interface Props {
  pacote: PacoteViagem;
}

export default function CardPacketTrips({pacote}: Props) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <View style={styles.containerCard}>
      <View style={styles.containerImage}>
        <Image
          source={{uri: pacote.imagens[0]}}
          style={styles.imagemCapa}>
        </Image>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.nomeDestino}>
          {pacote.destino.nome}
          </Text>
        <View style={styles.containerValorViagem}>
          <Text style={styles.precoMoeda}>
            {pacote.preco.moeda}
          </Text>
          <Text style={styles.precoTotal}>
            {pacote.preco.total}
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


    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerCard: {
      width: 300,
      height: 400,
      borderRadius: 8,
      backgroundColor: themeColors[theme].backgroundCard,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      margin: 10,
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