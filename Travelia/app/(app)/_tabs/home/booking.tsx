import BookingStepsLine from '@/components/buttons/bookingStepsLine';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { CaretLeftIcon, CaretRightIcon, PencilLineIcon, PlusIcon, SeatIcon, UserIcon, UsersIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { PacoteViagem } from '@/assets/types/bookingType';
import FlightDepartReturn from '@/components/details/flightDepartReturn';
import CardDetailsGlobal from '@/components/cards/cardDetailsGlobal';
import TravelerSelect from '@/components/details/travelerSelect';
import { PriceText } from '@/components/utils/priceText';



export default function Booking() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{ pacote: string }>();

  const pacoteObj: PacoteViagem = JSON.parse(params.pacote);


return (
  <View style={styles.container}>
    <View style={styles.containerHeader}>
      <HeaderGlobal
        titlePage="Booking Details"
        leftIcon={<CaretLeftIcon size={24} color={themeColors[theme].icon} />}
        onPressRightIcon={() => {}}
      />
      <View style={styles.containerSteps}>
        <BookingStepsLine />
      </View>
    </View>

  <ScrollView
    style={styles.scrollVertical}
    showsVerticalScrollIndicator={false}
    >
    <View style={styles.containerFlightDetails}>
      <ScrollView 
        style={styles.containerScrollHorizontal}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
      <View style={styles.containerFlights}>
        <FlightDepartReturn
          direction="Departure"
          includeStyle={styles.tagFlightTop}
          dateBoarding={pacoteObj.voos.ida.data_completa}
          airport_origin={pacoteObj.voos.ida.aeroporto_origem ?? ''}
          hour_boarding={pacoteObj.voos.ida.horario_partida}
          airport_destination={pacoteObj.voos.ida.aeroporto_destino ?? ''}
          hour_destination={pacoteObj.voos.ida.horario_chegada}
          numero_voo={pacoteObj.voos.ida.numero}
          escala={pacoteObj.voos.ida.escala ?? ''}
          name_airline={pacoteObj.voos.companhia_aerea.nome}
          logo_airline={pacoteObj.voos.companhia_aerea.logo}
        />
        <FlightDepartReturn
          direction="Return"
          includeStyle={styles.tagFlightTop}
          dateBoarding={pacoteObj.voos.volta.data_completa}
          airport_origin={pacoteObj.voos.volta.aeroporto_origem ?? ''}
          hour_boarding={pacoteObj.voos.volta.horario_partida}
          airport_destination={pacoteObj.voos.volta.aeroporto_destino ?? ''}
          hour_destination={pacoteObj.voos.volta.horario_chegada}
          numero_voo={pacoteObj.voos.volta.numero}
          escala={pacoteObj.voos.volta.escala ?? ''}
          name_airline={pacoteObj.voos.companhia_aerea.nome}
          logo_airline={pacoteObj.voos.companhia_aerea.logo}
        />
      </View>

      </ScrollView>
    </View>

    <View style={styles.containerContactDetails}>
      <CardDetailsGlobal 
        title="Contact Details"
        leftIcon={<UserIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<PencilLineIcon size={24} color={themeColors[theme].realceBlue} />}
      >
        <Text style={styles.textContactName}>Andrew Ainsley</Text>
        <Text style={styles.textContactEmail}>andrew.ainsley@me.com</Text>
        <Text style={styles.textContactPhone}>1-234-567-8901</Text>

      </CardDetailsGlobal>
        

    </View>

    <View style={styles.containerTravelersDetails}>
      <CardDetailsGlobal 
        title="Travelers Details"
        leftIcon={<UsersIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<PlusIcon size={24} color={themeColors[theme].realceBlue} />}
      >
        <TravelerSelect label="Traveler 1" value="Traveler" onPress={() => {}} />
        <TravelerSelect label="Traveler 2" value="Traveler" onPress={() => {}} />
        
      </CardDetailsGlobal>
    </View>

    <View style={styles.flightSeatsDeparture}>
      <CardDetailsGlobal 
        title="Departures Flight Seats"
        leftIcon={<SeatIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={24} color={themeColors[theme].realceBlue} />}
        borderStyleProp={styles.borderPriceDetails}
      />
    </View>

    <View style={styles.flightSeatsReturn}>
      <CardDetailsGlobal 
        title="Return Flight Seats"
        leftIcon={<SeatIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={24} color={themeColors[theme].realceBlue} />}
        borderStyleProp={styles.borderPriceDetails}
      />
    </View>

    <View style={styles.containerPriceDetails}>
      <CardDetailsGlobal 
        title="Price Details"
        leftIcon={<UsersIcon size={24} color={themeColors[theme].icon} />}
        
      >
      <View style ={styles.gridPriceDetails}>
        <View style={styles.rowPriceDetails}>
          <Text style={styles.labelPriceDetails}>Travel Package ({pacoteObj.viajantes.quantidade}x)</Text>
          <Text style={styles.valuePriceDetails}>
            <PriceText value={pacoteObj.preco.total}
              currency={pacoteObj.preco.moeda} 
              style={styles.textPriceValue}
            />
          </Text>
        </View>
        <View style={styles.rowPriceDetails}>
          <Text style={styles.labelPriceDetails}>Price Parcel</Text>
          <Text style={styles.valuePriceDetails}>
            {pacoteObj.preco.parcelamento}
          </Text>
        </View>
        <View style={styles.rowPriceDetailsTotal}>
          <Text style={styles.labelPriceDetails}>Total Price</Text>
          <Text style={styles.valuePriceDetails}>
            <PriceText value={pacoteObj.preco.total}
              currency={pacoteObj.preco.moeda} 
              style={styles.textPriceValue}
            />
          </Text>
        </View>
          
        
      </View>

      </CardDetailsGlobal>

    </View>

    <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.buttonFooter}>
          <Text style={styles.textButtonFooter}> Continue </Text>
        </TouchableOpacity>
    </View>
  </ScrollView>


  </View>
);
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: themeColors[theme].background,
    },

    tagFlightTop: {
      backgroundColor: "transparent",
    },

    containerHeader: {
      flexDirection: 'column',
      backgroundColor: themeColors[theme].backgroundCard,
      
    },

    scrollVertical: {
      flex: 1,
    },


    containerSteps: {
      marginTop: 10,
      marginBottom: 20,
    },

    containerScrollHorizontal: {
      flex: 1,
    },

    containerFlightDetails: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },

    containerFlights: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingBottom: 20,
    },

    containerContactDetails: {
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 10,
    },

    textContactName: {
      fontSize: 18,
      color: themeColors[theme].textPrimary,
      fontWeight: 'bold',
    },
    textContactEmail: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
    },
    textContactPhone: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
    },

    containerTravelersDetails: {
      width: '100%',
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 10,
    },

    flightSeatsDeparture: {
      width: '100%',
      marginTop: 20,
      marginBottom: 30,
      paddingHorizontal: 10,
    },

    borderPriceDetails: {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },

    flightSeatsReturn: {
      width: '100%',
      marginBottom: 30,
      paddingHorizontal: 10,
    },

    containerPriceDetails: {
      width: '100%',
      marginBottom: 30,
      paddingHorizontal: 10,
    },

    gridPriceDetails: {
      marginTop: 10,
      gap: 15,
    },
    rowPriceDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelPriceDetails: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },
    valuePriceDetails: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textPriceValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    rowPriceDetailsTotal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: themeColors[theme].borderColor,
    },

    containerFooter: {
      flexDirection: 'column',
      alignItems: 'center',
      width: 400,
      paddingVertical: 20,
      backgroundColor: themeColors[theme].backgroundCard,
    },

    buttonFooter: {
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 300,
    },

    textButtonFooter: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    


  });

