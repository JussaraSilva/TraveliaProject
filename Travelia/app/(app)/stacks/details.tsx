
import Gallery from "@/components/others/carouselPagination";
import HeaderButtons from "@/components/others/headerButtons";
import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useLocalSearchParams } from "expo-router";
import { TrophyIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";



export default function Details() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{ pacote?: string }>();

  const pacoteStr = params.pacote ?? "{}";

  let pacoteObj;
  try {
    pacoteObj = JSON.parse(pacoteStr);
  } catch {
    pacoteObj = {};
  }


  return (
    <View style={styles.container}>
      <HeaderButtons />
      <ScrollView>
        <View style={styles.contentContainer}>

          <View style={styles.imagemCapa}>
            <Gallery imagens={pacoteObj.imagens} />
            <View style={styles.iconTop}>
              <TrophyIcon 
                size={30} 
                color={themeColors[theme].textButton}   
                weight="light"
              />
              <Text style={styles.textIconTop}>
                {pacoteObj.avaliacao.pontuacao}
              </Text>
            </View>
            
          </View>
        </View>
        <Text>
          
          {pacoteObj.nome_pacote}
        </Text>
      </ScrollView>
      
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: themeColors[theme].background,
      paddingHorizontal: 10, 
    },

    contentContainer: {
      width: "100%",
      marginTop: 5,
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
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  });