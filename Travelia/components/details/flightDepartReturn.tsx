import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CaretRightIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { StyleSheet, View, Text, Image, ViewStyle, StyleProp, TouchableOpacity } from "react-native";
import { DateText } from "../utils/date/formatDate";


type Props = {
  include?: string;
  direction: string;
  dateBoarding: string;
  airport_origin?: string;
  hour_boarding: string;
  airport_destination?: string;
  hour_destination: string;
  numero_voo: string;
  escala?: string;
  name_airline?: string;
  logo_airline?: string;
  includeStyle?: StyleProp<ViewStyle>;


}


export default function FlightDepartReturn({include, direction, dateBoarding, airport_origin, hour_boarding, airport_destination, hour_destination, numero_voo, escala, name_airline, logo_airline, includeStyle }: Props) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  
  function calculateDuration (startTime?: string, endTime?: string) {

    if (!startTime || !endTime) {
      return '';
    }

    const startParts = startTime.split(":").map(Number);
    const endParts = endTime.split(":").map(Number);

    if (
      startParts.length !== 2 ||
      endParts.length !== 2 ||
      startParts.some(isNaN) ||
      endParts.some(isNaN)
    ) {
      return ""; // horário inválido
    }
    
    const [startHour, startMinutes] = startTime.split(':').map(Number);
    const [endHour, endMinutes] = endTime.split(':').map(Number);
  
    const startTotal = startHour * 60 + startMinutes;
    let endTotal = endHour * 60 + endMinutes;
  
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }
  
    const diff = endTotal - startTotal;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
  
    return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
  }

  const duration = calculateDuration(hour_boarding, hour_destination);
  

  return (
    <View style={styles.container}>
      <View style={styles.cardFlight}>
        <View style={[styles.cardTitleHeader, includeStyle]}>
          <Text style={styles.textCardTitle}>
            {include}
          </Text>
        </View>
        <View style={styles.cardFlightTop}>
          <View style={styles.containerTextDirection}>
            <Text style={styles.textCardDirection}>{direction}</Text>
          </View>
          
          <View style={styles.textCardDateContainer}>
            <Text style={styles.textCardDate}><DateText 
            value={dateBoarding}
            variant="full"
            /></Text>
          </View>
          <View style={styles.containerButtonMore}>
            <TouchableOpacity style={styles.buttonMore}>
              <CaretRightIcon size={30} color={themeColors[theme].icon} weight="light" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardFlightMiddle}>
          <View style={styles.flightBoardingContainer}>
            <Text style={styles.textBoardingCity}>{airport_origin}</Text>
            <Text style={styles.textBoardinHour}>{hour_boarding}</Text>
            <Text style={styles.textBoardingAirport}>{numero_voo}</Text>
          </View>

          <View style={styles.flightLine}>
            <Image
              source={require('@/assets/images/imagesApp/flight_imageTransparent1.png')}
              style={{ width: 110, height: 50, resizeMode: "contain" }}
            />
            <Text style={styles.textLine}>{duration}</Text>
            <Text style={styles.textLine}>{escala}</Text>
          </View>

          <View style={styles.flightLandingContainer}>
            <Text style={styles.textLandingCity}>{airport_destination}</Text>
            <Text style={styles.textLandingHour}>{hour_destination}</Text>
            <Text style={styles.textLandingAirport}>{numero_voo}</Text>
          </View>
        </View>

        <View style={styles.cardFlightBottom}>
          <View style={styles.companyAreaContainer}>
            <View style={styles.airline}>
              <View style={styles.logoAirline}>
                <Image
                  style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                  source={{uri: logo_airline}}
                  />
              </View>
              <Text style={styles.nameAirline}>{name_airline}</Text>
              
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.textButton}>Change Option</Text>
          </View>
          
        </View>

      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 20,
    },

    cardFlight: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 15,
      gap: 5,
      width: 360,
      paddingHorizontal : 10,
    },

    cardTitleHeader: {
      position: 'absolute',
      top: -16,
      left: 0,
      borderBottomEndRadius: 10,
      borderTopStartRadius: 10,
      backgroundColor: themeColors[theme].realceBlue,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textCardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    cardFlightTop: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
      marginTop: 10,
      
    },

    containerTextDirection: {
      padding: 10,
      backgroundColor: themeColors[theme].realceLightBlue,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    textCardDirection: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textColorButtonRealce,
    },

    textCardDateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      wordWrap: 'break-word',
      
    },

    textCardDate: {
      fontSize: 14,
      color: themeColors[theme].textPrimary,
      fontWeight: 'bold',
    },

    containerButtonMore: {
      width: "5%",
    }, 

    buttonMore: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardFlightMiddle: {
      flexDirection: 'row',
      alignItems: 'center',     
      gap: 15,
      maxWidth: "100%",
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
      paddingHorizontal : 10,
      
    },

    flightBoardingContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },

    textBoardingCity: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textBoardinHour: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },

    textBoardingAirport: {
      fontSize: 14,
      color: themeColors[theme].textPrimary,
    },

    flightLine: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    flightLandingContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    textLandingCity: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textLandingHour: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },
    
    textLandingAirport: {
      fontSize: 14,
      color: themeColors[theme].textPrimary,
    },

    textLine: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },

    cardFlightBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      width: "100%",
    },

    companyAreaContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },

    airline: {
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 20,

    },

    logoAirline: {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors[theme].borderColor,
    },

    nameAirline: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    buttonContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: themeColors[theme].realceLightBlue,
      borderRadius: 20,
    },

    textButton: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textColorButtonRealce,
    },
                                                                                                


    
  });