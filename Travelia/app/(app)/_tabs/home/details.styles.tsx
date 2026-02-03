import { themeColors, ThemeName } from "@/constants/theme";
import { StyleSheet } from "react-native";

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
      width: 400,
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
      width: 400,
      marginTop: 5,
      backgroundColor: themeColors[theme].background,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerInfoInclude: {
      flexDirection: 'column',
      marginTop: 5,
      maxWidth: '100%',
      
    },

    containerIncludeFlight: {
      flexDirection: 'column',
      marginTop: 5,
      maxWidth: '100%',
      
    },

    containerIncludeAccomodation: {
      flexDirection: 'column',
      marginTop: 5,
      maxWidth: '100%',
      
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
      paddingHorizontal: 10,
      
    },

    containerInfoFooter: {
      flexDirection: 'column',
      backgroundColor: themeColors[theme].backgroundCard,
      marginTop: 5,
      width: 400,
      
    },
  });

export default createStyles;