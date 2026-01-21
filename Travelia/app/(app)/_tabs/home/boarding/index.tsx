import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CaretLeftIcon, RectangleIcon } from 'phosphor-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTravelers } from '@/context/traveler/travelerContext';
import { useBooking } from '@/context/booking/bookingContext';
import { DateText } from '@/components/utils/date/formatDate';
import SeatMap from '@/hooks/seat-map/SeatMap';
import { useState } from 'react';

export default function Boarding() {
  const { flightType, passengerIndex } = useLocalSearchParams<{
    flightType?: 'departure' | 'return';
    passengerIndex?: string;
  }>();

  const currentPassengerIndex = Number(passengerIndex ?? 0);

  const currentFlightType = flightType ?? 'departure';

  const { theme, styles } = useThemedStyles(createStyles);

  const { pacoteOriginal } = useBooking();
  const flight =
    currentFlightType === 'departure'
      ? pacoteOriginal.voos.ida
      : pacoteOriginal.voos.volta;

  const { savedTravelers } = useTravelers();

  const { updateSeatForTraveler } = useTravelers();

  function handleSeatSelect(seatId: string) {
    // 1. Salva o assento para o passageiro que está selecionado no momento
    updateSeatForTraveler(selectedPassengerIndex, seatId, currentFlightType);

    // 2. Lógica para pular para o próximo passageiro
    const nextIndex = selectedPassengerIndex + 1;

    // Verifica se o próximo índice existe dentro da lista de viajantes
    if (nextIndex < savedTravelers.length) {
      // Pequeno delay opcional para o usuário ver o assento sendo marcado
      // antes da interface pular para o próximo (melhora a percepção visual)
      setTimeout(() => {
        setSelectedPassengerIndex(nextIndex);
      }, 300);
    }
  }

  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(
    currentPassengerIndex
  );

  const handleBack = () => {
    router.back();
  };

  const handleDone = () => {
    router.replace('/(app)/_tabs/home/booking');
  };

  return (
    <View style={styles.container}>
      <View>
        <HeaderGlobal
          titlePage={
            flightType === 'departure'
              ? 'Departure Flight Seat'
              : 'Return Flight Seat'
          }
          leftIcons={[
            <CaretLeftIcon
              key='back'
              size={30}
              color={themeColors[theme].icon}
              weight='light'
            ></CaretLeftIcon>]
          }
          onPressLeftIcon={handleBack}
        />
      </View>
      <View>
        <FlatList
          data={savedTravelers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => setSelectedPassengerIndex(index)}
              style={[
                styles.containerCard,
                index === selectedPassengerIndex &&
                  styles.selectedPassengerStyle,
              ]}
            >
              <View
                style={[
                  styles.containerNumberPassenger,
                  index === selectedPassengerIndex &&
                    styles.selectedContainerNumberStyle,
                ]}
              >
                <Text
                  style={[
                    styles.textNumberPassenger,
                    index === selectedPassengerIndex &&
                      styles.selectedTextNumberStyle,
                  ]}
                >
                  {index + 1}
                </Text>
              </View>

              <View style={styles.containerInfoPassenger}>
                <View style={styles.containerNamePassenger}>
                  <Text
                    style={[
                      styles.textNamePassenger,
                      index === selectedPassengerIndex &&
                        styles.selectedTextNameStyle,
                    ]}
                  >
                    {item.nomeCompleto}
                  </Text>
                </View>

                <View style={styles.containerSeatPassenger}>
                  <Text
                    style={[
                      styles.textSeatPassenger,
                      index === selectedPassengerIndex &&
                        styles.selectedTextSeatStyle,
                    ]}
                  >
                    {item.seats?.[currentFlightType]
                      ? `Seat: ${item.seats[currentFlightType]}`
                      : 'Select Seat'}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.bodySeats}>
        <View style={styles.containerSeatsHeader}>
          <View style={styles.containerLogoCompany}>
            <Image
              style={styles.companhiaAreaLogo}
              source={{ uri: pacoteOriginal.voos.companhia_aerea.logo }}
            />
          </View>
          <View style={styles.containerNameCompany}>
            <View style={styles.containerTextNameCompany}>
              <Text style={styles.textNameCompany}>
                {pacoteOriginal.voos.companhia_aerea.nome}
              </Text>
            </View>
            <View style={styles.containerTextNameAirport}>
              <Text style={styles.textNameAirport}>
                {flight.aeroporto_origem}
              </Text>
              <Text style={styles.separator}>-</Text>
              <Text style={styles.textNameAirport}>
                {flight.aeroporto_destino}
              </Text>
            </View>
          </View>
          <View style={styles.containerHourFly}>
            <View style={styles.containerTextHourFly}>
              <Text style={styles.hourTakeOff}>{flight.horario_partida}</Text>
              <Text style={styles.separator}>-</Text>
              <Text style={styles.hourLanding}>{flight.horario_chegada}</Text>
            </View>
            <View style={styles.containerTextData}>
              <DateText value={flight.data_completa} variant='short' />
            </View>
          </View>
        </View>

        <View style={styles.containerSeatsLabel}>
          <View style={styles.containerSeatType}>
            <RectangleIcon
              size={20}
              color={themeColors[theme].selectedColor}
              weight='fill'
            />
            <Text style={styles.textSeatsLabel}>Selected</Text>
          </View>
          <View style={styles.containerSeatType}>
            <RectangleIcon
              size={20}
              color={themeColors[theme].unavailableColor}
              weight='fill'
            />
            <Text style={styles.textSeatsLabel}>Occupied</Text>
          </View>
          <View style={styles.containerSeatType}>
            <RectangleIcon
              size={20}
              color={themeColors[theme].availableColor}
              weight='fill'
            />
            <Text style={styles.textSeatsLabel}>Available</Text>
          </View>
        </View>

        <View style={styles.containerSeatsBody}>
          <SeatMap
            travelers={savedTravelers}
            flightType={currentFlightType}
            currentPassengerIndex={selectedPassengerIndex}
            onSelectSeat={handleSeatSelect}
          />
        </View>
      </View>
      <View style={styles.containerSeatsFooter}>
        <View style={styles.containerTextSeatsFooter}>
          <Text style={styles.titleSeatsFooter}>Seats:</Text>

          <Text style={styles.containerSelectedSeatsFooter}>
            {savedTravelers
              .map((t) => t.seats?.[currentFlightType])
              .filter(Boolean)
              .join(' • ')}
          </Text>
        </View>
        <View style={styles.containerButtonSeatsFooter}>
          <TouchableOpacity
            style={styles.buttonSeatsFooter}
            onPress={handleDone}
          >
            <Text style={styles.textButtonSeatsFooter}>Done</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors[theme].backgroundCard,
    },

    containerCard: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 16,
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 8,
      backgroundColor: themeColors[theme].backgroundCard,
      borderWidth: 1,
      borderColor: themeColors[theme].borderColor,
    },

    containerNumberPassenger: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: themeColors[theme].realceBlue,
    },

    textNumberPassenger: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].colorTextButton,
    },

    containerInfoPassenger: {
      flexDirection: 'column',
      gap: 10,
    },

    containerNamePassenger: {
      flexDirection: 'row',
    },

    textNamePassenger: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textSeatPassenger: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },

    containerSeatPassenger: {
      flexDirection: 'row',
    },

    selectedPassengerStyle: {
      backgroundColor: themeColors[theme].realceBlue,
    },

    selectedContainerNumberStyle: {
      backgroundColor: themeColors[theme].textButton,
    },

    selectedTextNumberStyle: {
      color: themeColors[theme].realceBlue,
    },

    selectedTextNameStyle: {
      color: themeColors[theme].textButton,
    },

    selectedTextSeatStyle: {
      color: themeColors[theme].textButton,
      fontWeight: 'bold',
    },

    bodySeats: {
      flex: 1,
      alignItems: 'center',
      // backgroundColor: "red",
      paddingHorizontal: 15,
    },

    containerSeatsHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: themeColors[theme].backgroundCard,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: themeColors[theme].borderColor,
    },

    containerLogoCompany: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },

    companhiaAreaLogo: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      resizeMode: 'contain',
    },

    containerNameCompany: {
      width: '55%',
      flexDirection: 'column',
      gap: 5,
    },

    containerTextNameCompany: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },

    containerTextNameAirport: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },

    textNameCompany: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textNameAirport: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerHourFly: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    containerTextHourFly: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    hourTakeOff: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    separator: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    hourLanding: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerTextData: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    containerSeatsBody: {
      width: '100%',
      marginTop: 30,
      alignItems: 'center',
      gap: 10,
    },

    containerSeatsFooter: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
    },

    containerTextSeatsFooter: {
      width: '20%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 5,
    },

    titleSeatsFooter: {
      fontSize: 10,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerSelectedSeatsFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textSelectedSeatsFooter: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerButtonSeatsFooter: {
      width: '70%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 10,
    },

    buttonSeatsFooter: {
      width: '100%',
      backgroundColor: themeColors[theme].realceBlue,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: 'center',
      gap: 5,
    },

    textButtonSeatsFooter: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    containerSeatsLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      marginTop: 10,
    },

    containerSeatType: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },

    textSeatsLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },
  });
