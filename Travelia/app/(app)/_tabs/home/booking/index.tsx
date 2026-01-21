/**
 * BOOKING – tela inicial do fluxo de reserva
 * Rota: /(app)/_tabs/home/booking
 */

import BookingStepsLine from '@/components/buttons/bookingStepsLine';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';

import { CaretLeftIcon, CaretRightIcon, PencilLineIcon, PlusIcon, SeatIcon, UserIcon, UsersIcon } from 'phosphor-react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import FlightDepartReturn from '@/components/details/flightDepartReturn';
import CardDetailsGlobal from '@/components/cards/cardDetailsGlobal';
import TravelerSelect from '@/components/details/travelerSelect';
import { PriceText } from '@/components/utils/price/priceText';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

import { useTravelers} from '@/context/traveler/travelerContext';
import { useBooking } from '@/context/booking/bookingContext';
import { useEffect } from 'react';
import FlightSeatSelect from '@/components/details/flightSeatSelect';



export default function Booking() {
  const { savedTravelers, removeTraveler } = useTravelers();
  const { theme, styles } = useThemedStyles(createStyles);

  const { pacoteAtual, updateViajantes } = useBooking();

// 4. Efeito para sincronizar a quantidade de viajantes
  // Sempre que a lista de savedTravelers mudar, o JSON do pacoteAtual no contexto atualiza o preço
  useEffect(() => {
    if (pacoteAtual && savedTravelers.length !== pacoteAtual.viajantes.quantidade) {
      updateViajantes(savedTravelers.length);
    }
  }, [savedTravelers.length, pacoteAtual, updateViajantes]);

  if (!pacoteAtual) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: "red" }}>Loading booking data...</Text>
      </View>
    );
  }

  const handleContinuePayment = () => {
    router.push('/(app)/_tabs/home/payment');
  };

  const handlePassengers = () => {
    router.push({
      pathname: '/(app)/_tabs/home/booking/travelerAdd',
    });
  }

  const handlePressTraveler = (index: number, traveler: any) => {
  if (!traveler) {
    // Se não tem ninguém, vai adicionar
    router.push({
      pathname: '/(app)/_tabs/home/booking/travelerAdd',
    });
  } else {
    // Se já tem, pergunta o que fazer
    Alert.alert(
      "Manage Traveler",
      `What do you want to do with ${traveler.nomeCompleto}?`,
      [
        { text: "Remove", onPress: () => removeTraveler(index), style: "destructive" },
        { 
          text: "Edit", 
          onPress: () => router.push({
            pathname: '/(app)/_tabs/home/booking/travelerAdd',
            params: { 
                travelerData: JSON.stringify(traveler), // Passa os dados atuais
                editIndex: index.toString()// Passa o índice para saber quem atualizar
            },
          }) 
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }
  };


  const handleBoardingDeparture = () => {
    router.push({
      pathname: '/(app)/_tabs/home/boarding',
      params: { flightType: 'departure' },
    });
  }
  const handleBoardingReturn = () => {
    router.push({
      pathname: '/(app)/_tabs/home/boarding',
      params: { flightType: 'return' },
    });
  }



  // Em Booking.tsx

  const handleOpenSeatSelection = (index: number, type: 'departure' | 'return') => {
    router.push({
      pathname: '/(app)/_tabs/home/boarding',
      params: { 
        passengerIndex: index.toString(), 
        flightType: type 
      },
    });
  };



return (
  <View style={styles.container}>
    <View style={styles.containerHeader}>
      <HeaderGlobal
        titlePage="Booking Details"
        leftIcons={[<CaretLeftIcon key='back' size={24} color={themeColors[theme].icon} />]}
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
          dateBoarding={pacoteAtual.voos.ida.data_completa}
          airport_origin={pacoteAtual.voos.ida.aeroporto_origem ?? ''}
          hour_boarding={pacoteAtual.voos.ida.horario_partida}
          airport_destination={pacoteAtual.voos.ida.aeroporto_destino ?? ''}
          hour_destination={pacoteAtual.voos.ida.horario_chegada}
          numero_voo={pacoteAtual.voos.ida.numero}
          escala={pacoteAtual.voos.ida.escala ?? ''}
          name_airline={pacoteAtual.voos.companhia_aerea.nome}
          logo_airline={pacoteAtual.voos.companhia_aerea.logo}
        />
        <FlightDepartReturn
          direction="Return"
          includeStyle={styles.tagFlightTop}
          dateBoarding={pacoteAtual.voos.volta.data_completa}
          airport_origin={pacoteAtual.voos.volta.aeroporto_origem ?? ''}
          hour_boarding={pacoteAtual.voos.volta.horario_partida}
          airport_destination={pacoteAtual.voos.volta.aeroporto_destino ?? ''}
          hour_destination={pacoteAtual.voos.volta.horario_chegada}
          numero_voo={pacoteAtual.voos.volta.numero}
          escala={pacoteAtual.voos.volta.escala ?? ''}
          name_airline={pacoteAtual.voos.companhia_aerea.nome}
          logo_airline={pacoteAtual.voos.companhia_aerea.logo}
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
        onPressIcon={handlePassengers}
      >
        {/* Agora o MAP é baseado no que está no Contexto */}
          {Array.from({ length: Math.max(pacoteAtual.viajantes.quantidade, savedTravelers.length) }).map((_, index) => {
            const traveler = savedTravelers[index];
            return (
              <TravelerSelect 
                key={index} 
                label={`Traveler ${index + 1}`} 
                value={traveler ? traveler.nomeCompleto : "Select Traveler"} 
                onPress={() => handlePressTraveler(index, traveler)}
              />
            );
          })}
      </CardDetailsGlobal>
    </View>

    <View style={styles.flightSeatsDeparture}>
      <CardDetailsGlobal 
        title="Departures Flight Seats"
        leftIcon={<SeatIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={24} color={themeColors[theme].realceBlue} />}
        onPressIcon={handleBoardingDeparture}
        showDivider={false}
      >
        {/* Agora o MAP é baseado no que está no Contexto */}
          {Array.from({ length: Math.max(pacoteAtual.viajantes.quantidade, savedTravelers.length) }).map((_, index) => {
            const traveler = savedTravelers[index];
            const seat = traveler?.seats?.departure;
            return (
              <FlightSeatSelect 
                key={index} 
                label={`Traveler ${index + 1}`}
                labelRight={"Seat"} 
                value={traveler ? traveler.nomeCompleto : "Select Traveler"}
                valueSeats={seat ?? 'Select'}
                onPress={() => handleOpenSeatSelection(index, 'departure')}
              />
            );
          })}
      </CardDetailsGlobal>
    </View>

    <View style={styles.flightSeatsReturn}>
      <CardDetailsGlobal 
        title="Return Flight Seats"
        leftIcon={<SeatIcon size={24} color={themeColors[theme].icon} />}
        rightIcon={<CaretRightIcon size={24} color={themeColors[theme].realceBlue} />}
        onPressIcon={handleBoardingReturn}
        showDivider={false}>
          {/* Agora o MAP é baseado no que está no Contexto */}
          {Array.from({ length: Math.max(pacoteAtual.viajantes.quantidade, savedTravelers.length) }).map((_, index) => {
            const traveler = savedTravelers[index];
            const seat = traveler?.seats?.return;
            return (
              <FlightSeatSelect 
                key={index} 
                label={`Traveler ${index + 1}`}
                labelRight={"Seat"} 
                value={traveler ? traveler.nomeCompleto : "Select Traveler"}
                valueSeats={seat ?? 'Select'} 
                onPress={() => handleOpenSeatSelection(index, 'return')}
              />
            );
          })}
        </CardDetailsGlobal>
    </View>

    <View style={styles.containerPriceDetails}>
      <CardDetailsGlobal 
        title="Price Details"
        leftIcon={<UsersIcon size={24} color={themeColors[theme].icon} />}
        
      >
      <View style ={styles.gridPriceDetails}>
        <View style={styles.rowPriceDetails}>
          <Text style={styles.labelPriceDetails}>
            Travel Package ({pacoteAtual.viajantes.quantidade}x)</Text>
          <Text style={styles.valuePriceDetails}>
            <PriceText value={pacoteAtual.preco.total}
              currency={pacoteAtual.preco.moeda} 
              style={styles.textPriceValue}
            />
          </Text>
        </View>
        <View style={styles.rowPriceDetails}>
          <Text style={styles.labelPriceDetails}>Price Parcel</Text>
          <Text style={styles.valuePriceDetails}>
            {pacoteAtual.preco.parcelamento}
          </Text>
        </View>
        <View style={styles.rowPriceDetailsTotal}>
          <Text style={styles.labelPriceDetails}>Total Price</Text>
          <Text style={styles.valuePriceDetails}>
            <PriceText value={pacoteAtual.preco.total}
              currency={pacoteAtual.preco.moeda} 
              style={styles.textPriceValue}
            />
          </Text>
        </View>
          
        
      </View>

      </CardDetailsGlobal>

    </View>

    <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.buttonFooter}
          onPress={handleContinuePayment}
        >
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
      
      
    },

    containerContactDetails: {
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 20,
      
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
      paddingHorizontal: 20,
    },

    flightSeatsDeparture: {
      width: '100%',
      marginTop: 20,
      marginBottom: 30,
      paddingHorizontal: 20,
    },

    borderPriceDetails: {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },

    flightSeatsReturn: {
      width: '100%',
      marginBottom: 30,
      paddingHorizontal: 20,
    },

    containerPriceDetails: {
      width: '100%',
      marginBottom: 30,
      paddingHorizontal: 20,
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

