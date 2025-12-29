import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CaretRightIcon, DotIcon, MapPinAreaIcon, StarIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleSheet, View, Text, Image, ViewStyle, StyleProp, TouchableOpacity } from "react-native";


type Props = {
  include?: string;
  checkIn: string;
  checkOut: string;
  noites: number;
  name_hotel: string;
  categoria_hotel: string;
  nameCity: string;
  nameCountry: string;
  includeStyle?: StyleProp<ViewStyle>;
  imagemHotel: string;
}


export default function AccomodationInfo({include, checkIn, checkOut, noites, name_hotel, categoria_hotel, nameCity, nameCountry, includeStyle, imagemHotel }: Props) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  
  

  return (
    <View style={styles.container}>
      <View style={styles.cardAccomodantion}>
        <View style={styles.containerNights}>
              <Text style={styles.textQtdNights}>{noites} Noites</Text>
        </View>
        <View style={[styles.cardTitleHeader, includeStyle]}>
          <Text style={styles.textCardTitle}>
            {include}
          </Text>
          
        </View>
        <View style={styles.cardAccomodantionTop}>
          <View style={styles.containerTextCheck}>
            <View style={styles.containerTextCheckIn}>  
                <DotIcon size={30} color="green" weight="duotone" />
                <Text style={styles.textDateCheckIn}>
                  {checkIn}
                </Text>
            </View>
            <View style={styles.containerTextCheckOut}>  
                <DotIcon size={30} color="red" weight="duotone" />
                <Text style={styles.textDateCheckOut}>
                  {checkOut}
                </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.containerArrow}>
            <CaretRightIcon size={30} color={themeColors[theme].icon} weight="light" />
          </TouchableOpacity>
          
        </View>

        <View style={styles.cardAccomodationMiddle}>
          <View style={styles.rowAccomodantionContainer}>
              <View style={styles.containerImagemHotel}>
                <Image
                  source={{uri: imagemHotel}}
                  style={{ 
                          width: "100%", 
                          height: "100%", 
                          resizeMode: "cover", 
                          borderRadius: 20, 
                        }}
                />
              </View>
              <View style={styles.containerTextAccomodantion}>
                <Text style={styles.textNameHotel}>{name_hotel}</Text>
                <View style={styles.textCategoriaEstrelas}>
                  <StarIcon 
                    size={20} 
                    color={themeColors[theme].starYellowColor} weight="fill" 
                  />
                  <Text style={styles.textCategoria}>
                    {categoria_hotel}
                  </Text>
                </View>
                <View style={styles.containerAdressHotel}>
                  <MapPinAreaIcon size={15} color={themeColors[theme].icon} weight="fill" />
                  <Text style={styles.textAdressHotel}>
                  {nameCity}, {nameCountry}
                  </Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.textButton}>Change Option</Text>
                </TouchableOpacity>
              </View>
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

    cardAccomodantion: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 10,
      gap: 5,
      width: 370,
      height: 320,
    },

    containerNights: {
      position: 'absolute',
      top: -16,
      right: 0,
      backgroundColor: themeColors[theme].realceBlue,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    textQtdNights: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
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

    cardAccomodantionTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      width: '100%',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
      paddingBottom: 20,
    },

    containerTextCheck: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },

    containerTextCheckIn: {
      flexDirection: 'row',
      alignItems: 'center', 
    },


    containerTextCheckOut: {
      flexDirection: 'row',
      alignItems: 'center', 
    },


    textDateCheckIn: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textDateCheckOut: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    

    containerArrow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    textCardDate: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
      fontWeight: 'bold',
    },

    cardAccomodationMiddle: {
      flexDirection: 'row',
      alignItems: 'center',     
      justifyContent: 'space-between',
      gap: 8,
      maxWidth: "100%",
      width: "100%",
      height: 150,
    },

    rowAccomodantionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: "100%",
      paddingHorizontal: 5,
      paddingVertical: 5,
    },

    containerImagemHotel: {
      width: "40%",
      height: 120,
      borderRadius: 20,
      alignItems: 'center',
    },

    containerTextAccomodantion: {
      flexDirection: 'column',
      gap: 10,
      wordWrap: 'wrap',
      height: "100%",
      width: "60%",
      marginTop: 40,
    },

    textNameHotel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,

    },

    textCategoriaEstrelas: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 5,
      justifyContent: 'flex-start',
    },

    textCategoria: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerAdressHotel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textAdressHotel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
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
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textLandingHour: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },
    
    textLandingAirport: {
      fontSize: 16,
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
      gap: 5,
      width: '100%',
    },

    companyAreaContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    airline: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      
    },

    logoAirline: {
      width: 40,
      height: 40,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },

    nameAirline: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    buttonContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'flex-end',
      width: 150,
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