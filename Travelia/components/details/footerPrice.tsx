import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { AirplaneTakeoffIcon, CalendarDotsIcon, DotIcon, UsersIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DateText } from "../utils/date/formatDate";
import { PriceText } from "../utils/price/priceText";
import { router } from "expo-router";


type Props = {
  destino: string;
  dataSaida: string;
  dataRetorno: string;
  passengers: number;
  total_price: number;
  parcelamento: string;
  moeda: string;
  pacote: any;
}
export default function FooterPrice(
  { destino, dataSaida, dataRetorno, passengers, total_price, parcelamento, moeda, pacote }: Props
) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleBookPayment = () => {
  router.push({
    pathname: '/(app)/_tabs/home/booking',
  });
};


  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerFooterTop}>
        <View style={styles.containerDestiny}>
          <AirplaneTakeoffIcon 
            size={20} 
            color={themeColors[theme].icon} 
            weight="light"
          />
          <Text style={styles.textDestiny}>
            {destino}
          </Text>

        </View>
        <View style={styles.containerDate}>
          <CalendarDotsIcon 
            size={20} 
            color={themeColors[theme].icon} 
            weight="light"
          />
          <View style={styles.containertextPeriod}>
            <View style={styles.containerPeriodIn}>
              <DotIcon 
                size={25} 
                color={themeColors[theme].colorGreen} 
                weight="duotone"
              />
              <DateText value={dataSaida} variant="short"
                textStyle={styles.textPeriod}
                />
              

            </View>
            <View style={styles.containerPeriodOut}>
              <DotIcon 
                size={25} 
                color={themeColors[theme].colorRed} 
                weight="duotone"
              />
                <DateText value={dataRetorno} variant="short" 
                  textStyle={styles.textPeriod}
                />
            </View>
          </View>
        </View>
        <View style={styles.containerPassageiros}>
          <UsersIcon
            size={20} 
            color={themeColors[theme].icon} 
            weight="light"
          />
          <Text style={styles.textDestiny}>
            {passengers}
          </Text>
        </View>

        <View style={styles.containerEditInfo}>
            <TouchableOpacity style={styles.buttonEditInfo}
              onPress={() => {
                router.push({
                  pathname: '/(app)/_tabs/home/booking',
                });
              }}
            >
                <Text style={styles.textButtonEditInfo}>
                    Change
                </Text>
                
            </TouchableOpacity>
        </View>
        
        
      </View>
      <View style={styles.containerFooterBottom}>
        <View style={styles.containerPrice}>
          <View style={styles.containerPriceDetailPassenger}>
            <Text style={styles.priceTextTotal}>Total Price: </Text>
          </View>
          <View style={styles.containerPriceValue}>
              <PriceText value={total_price}
              currency={moeda} 
              style={styles.textPriceValue}
            />
          </View>
          <View style={styles.containerPriceDetailPassengers}>
            <Text style={styles.priceTextTotal}>Price Parcel: </Text>
            <Text style={styles.textPriceDouble}>{parcelamento}</Text>
          </View>
        </View>
        <View style={styles.containerButtonBuy}>
          <TouchableOpacity style={styles.buttonBuy}
            onPress={handleBookPayment}
          >
            <Text style={styles.textButtonBuy}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({

    containerFooter: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      backgroundColor: themeColors[theme].backgroundCard,
    },

    containerFooterTop: {
      width: "100%",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },

    containerDestiny: {
      flexDirection: 'row',
      width: '25%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 2,
      gap: 2,
      borderRightWidth: 1,
      borderRightColor: themeColors[theme].borderColor,
    },

    containerDate: {
      flexDirection: 'row',
      width: '47%',
      alignItems: 'center',
      paddingHorizontal: 2,
      borderRightWidth: 1,
      borderRightColor: themeColors[theme].borderColor,
    },

    containertextPeriod: {
      flexDirection: 'column',
      alignItems: 'center',
    },

    containerPeriodIn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',      
    },

    textPeriod: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerPeriodOut: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',    
    },

    containerPassageiros: {
      width: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 3,
    },

    textDestiny: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerEditInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 5,
      paddingHorizontal: 5,
      paddingVertical: 5,
    },

    buttonEditInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding : 10,
      borderRadius: 20,
      backgroundColor: themeColors[theme].realceLightBlue,
    },

    textButtonEditInfo: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textColorButtonRealce,
    },
    

    containerFooterBottom: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom: 10,
    },

    containerPrice: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    containerPriceDetailPassenger: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },

    priceTextTotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerPriceValue: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },

    textPriceValue: {
      fontSize: 25,
      fontWeight: 'bold',
      color: themeColors[theme].realceBlue,
    },

    containerPriceDetailPassengers: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },

    textPriceDouble: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].realceBlue,
    },


    containerButtonBuy: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },

    buttonBuy: {
      flexDirection: 'row',
      alignItems: 'center',
      padding : 20,
      borderRadius: 30,
      backgroundColor: themeColors[theme].realceBlue,
    },

    textButtonBuy: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },



  });