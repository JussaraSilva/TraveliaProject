import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { CaretLeftIcon } from 'phosphor-react-native';
import { router } from 'expo-router';
import { useTravelers } from '@/context/traveler/travelerContext';
import { useBooking } from '@/context/booking/bookingContext';
import { DateText } from '@/components/utils/formatDate';
import SeatMap from '@/hooks/seat-map/SeatMap';



export default function Boarding() {
  const { theme, styles } = useThemedStyles(createStyles);

  const { pacoteOriginal } = useBooking();

  const { savedTravelers } = useTravelers();


  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(0);

  const { updateSeatForTraveler } = useTravelers();
  
    function handleSeatSelect(seatId: string) {
    updateSeatForTraveler(selectedPassengerIndex, seatId);
  }


  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderGlobal 
          titlePage="Departure Flight Seat"
          leftIcon={
          <CaretLeftIcon 
            size={30} 
            color={themeColors[theme].icon} 
            weight="light">
          </CaretLeftIcon>
          }
          onPressLeftIcon={handleBack}
        />
      </View>
        <View style={styles.bodyTop}>
          <FlatList
            data={savedTravelers}
              horizontal
              showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Pressable
              onPress={() => setSelectedPassengerIndex(index)} 
              style={[styles.containerCard, index === selectedPassengerIndex && styles.selectedPassengerStyle]}>
                <View style={[styles.containerNumberPassenger, index === selectedPassengerIndex && styles.selectedContainerNumberStyle]}>
                  <Text style={[styles.textNumberPassenger, index === selectedPassengerIndex && styles.selectedTextNumberStyle]}>{index+1}</Text>
                </View>
                <View style={styles.containerInfoPassenger}>
                    <View style={styles.containerNamePassenger}> 
                      <Text style={[styles.textNamePassenger, index === selectedPassengerIndex && styles.selectedTextNameStyle]}>
                        {item.nomeCompleto}
                      </Text>                      
                    </View>
                    <View style={styles.containerSeatPassenger}>
                      <Text style={[styles.textSeatPassenger, index === selectedPassengerIndex && styles.selectedTextSeatStyle]}>
                        {item.seat ? `Seat: ${item.seat}` : 'Select Seat'}
                        </Text>
                    </View>
                </View>
              </Pressable>
            )}
            
          >
          </FlatList>
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
                    <Text style={styles.textNameCompany}>{pacoteOriginal.voos.companhia_aerea.nome}</Text>
                  </View>
                  <View style={styles.containerTextNameAirport}>
                    <Text style={styles.textNameAirport}>
                      {pacoteOriginal.voos.ida.aeroporto_origem}
                    </Text>
                    <Text style={styles.separator}>
                      -
                    </Text>
                    <Text style={styles.textNameAirport}>
                      {pacoteOriginal.voos.ida.aeroporto_destino}
                    </Text>
                  </View>
                </View>
                <View style={styles.containerHourFly}>
                  <View style={styles.containerTextHourFly}>
                    <Text style={styles.hourTakeOff}>{pacoteOriginal.voos.ida.horario_partida}</Text>
                    <Text style={styles.separator}>
                      -
                    </Text>
                    <Text style={styles.hourLanding}>{pacoteOriginal.voos.ida.horario_chegada}</Text>
                  </View>
                  <View style={styles.containerTextData}>
                    <DateText value={pacoteOriginal.voos.ida.data_completa} variant="short" />
                  </View>
                </View>                    
            </View>

            <View style={styles.containerSeatsBody}>
              
              <SeatMap
                selectedPassengerIndex={selectedPassengerIndex}
                selectedSeatByPassenger={savedTravelers[selectedPassengerIndex]?.seat}
                onSelectSeat={handleSeatSelect}
              />


            </View>
        </View>



    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
  },

  header: {
    
  },

  bodyTop: {
    
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
    width: '100%',
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
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "contain",
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
    marginTop: 60,
    alignItems: 'center',
    gap: 10,
  },

});

