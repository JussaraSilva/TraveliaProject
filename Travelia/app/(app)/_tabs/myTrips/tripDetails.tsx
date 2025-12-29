import ButtonFilter from '@/components/buttons/buttonFilters';
import PaymentInfoCard from '@/components/cards/paymentInfoCard';
import AccomodationInfo from '@/components/details/accomodationInfo';
import ActivitiesInfo from '@/components/details/activitiesInfo';
import FlightDepartReturn from '@/components/details/flightDepartReturn';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useRouter } from 'expo-router';
import {
  AirplaneInFlightIcon,
  AirplaneTakeoffIcon,
  BuildingApartmentIcon,
  CalendarDotsIcon,
  CaretLeftIcon,
  ChatTeardropTextIcon,
  CurrencyDollarIcon,
  DotsThreeVerticalIcon,
  PersonSimpleTaiChiIcon,
  ReceiptIcon,
  UsersIcon,
} from 'phosphor-react-native';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TripDetails() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const router = useRouter();

  const labelButton = ['Package', 'E-Ticket'];
  const [activeFilter, setActiveFilter] = useState(0);

  const paymentInfo = [
  { label: 'Status', value: 'Paid', type: 'badge' },
  { label: 'Payment Method', value: 'Mastercard (*4679)' },
  { label: 'Date & Time', value: 'Dec 20, 2025 · 09:41 AM' },
  { label: 'Booking ID', value: 'BID122025BKG', copy: true },
  { label: 'Transaction ID', value: 'TID094125TRX', copy: true },
  { label: 'Merchant ID', value: 'MID374028MRC', copy: true },
]
  const priceInfo = [
  { label: 'Travel Package (2 adults)', value: 'R$ 2.500,00'},
  { label: 'Travel Insurance', value: 'R$ 40,00' },
  { label: 'Tax', value: 'R$ 10,00' },
  { label: 'Discount (20%)', value: 'R$ 580,00'},
  { label: 'Total Price', value: 'R$ 2.670,00'},
]

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage='My Trip'
          leftIcon={<CaretLeftIcon size={28} />}
          rightIcon={<DotsThreeVerticalIcon size={28} />}
          onPressLeftIcon={() => {
            router.back();
          }}
          onPressRightIcon={() => {}}
        />
      </View>

      <View style={styles.containerFilter}>
        <ButtonFilter
          labels={labelButton}
          activeIndex={activeFilter}
          onPress={setActiveFilter}
          backgroundAtivoStyle={styles.backgroundAtivoStyle}
          activeTextStyle={styles.styleTextButtonActive}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerScroll}
      >
        <View style={styles.containerContent}>
          <View style={styles.containerCardPacket}>
            <View style={styles.containerTopRow}>
              <View style={styles.containerImageTop}>
                <Image
                  source={{
                    uri: 'https://d2yfnz5to9nvdi.cloudfront.net/wp-content/uploads/2019/08/passagem-aerea-promocional-executiva-emirates-bali-indonesia-asia-voe-simples-promo-sdfull.jpg',
                  }}
                  style={styles.imageTop}
                />
              </View>
              <View style={styles.containerNameTop}>
                <Text style={styles.textNameTop} numberOfLines={3}>
                  Bali & Memorable 3-Days Journey to Top Destinations (E-Ticket)
                </Text>
              </View>
            </View>

            <View style={styles.containerBottomRow}>
              <View style={styles.containerInfoColumnLeft}>
                <View style={styles.containerLocationLeft}>
                  <AirplaneTakeoffIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textLocationLeft}>New York / Bali</Text>
                </View>
                <View style={styles.containerDateLeft}>
                  <CalendarDotsIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textDateLeft}>Dec 27 - 29, 2025</Text>
                </View>
                <View style={styles.containerPassengersLeft}>
                  <UsersIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textPassengersLeft}>2 Adults</Text>
                </View>
              </View>
              <View style={styles.containerInfoColumnRight}>
                <View style={styles.containerFlightsRight}>
                  <AirplaneInFlightIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textFlightsRight}>2 Flights</Text>
                </View>
                <View style={styles.containerAccomodationRight}>
                  <BuildingApartmentIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textAccomodationRight}>
                    1 Accomodation
                  </Text>
                </View>
                <View style={styles.containerActivityRight}>
                  <PersonSimpleTaiChiIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textActivityRight}>1 Activity</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.containerTourGuide}>
            <View style={styles.containerInfoTourGuide}>
              <View style={styles.containerImageTourGuide}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                  }}
                  style={styles.imageTourGuide}
                />
              </View>
              <View style={styles.containerNameGuide}>
                <Text style={styles.textNameTourGuide}>Joaquin Holland</Text>
                <Text style={styles.textDescriptionTourGuide}>
                  Your Tour Guide
                </Text>
              </View>
            </View>

            <View style={styles.containerButtonTalkGuide}>
              <ChatTeardropTextIcon
                size={20}
                color={themeColors[theme].realceBlue}
                weight='light'
              />
            </View>
          </View>

          <View style={styles.containerTitlePackageDetails}>
            <Text style={styles.textTitlePackageDetails}>Package Details</Text>
          </View>

          <View style={styles.containerIncludeFlight}>
            <FlightDepartReturn
              include='Flight'
              direction='Departure'
              dateBoarding='Saturday Dec 27, 2025'
              airport_origin='New York (JFK)'
              hour_boarding='09:00'
              airport_destination='Bali (DPS)'
              hour_destination='08:00'
              numero_voo='LH 123'
              escala='Lima'
              name_airline='Emirates'
              logo_airline='https://logos-world.net/wp-content/uploads/2021/12/Emirates-Logo.png'
            />
            <FlightDepartReturn
              includeStyle={styles.flightReturn}
              direction='Return'
              dateBoarding='Monday, Dec 29 2025'
              airport_origin='Bali (DPS)'
              hour_boarding='10:00'
              airport_destination='New York (JFK)'
              hour_destination='08:30'
              numero_voo='LH 123'
              escala='Lima'
              name_airline='Emirates'
              logo_airline='https://logos-world.net/wp-content/uploads/2021/12/Emirates-Logo.png'
            />
          </View>

          <View style={styles.containerIncludeAccomodation}>
            <AccomodationInfo
              include='Accommodation'
              includeStyle={styles.accomodation}
              checkIn='Saturday Dec 27, 2025'
              checkOut='Monday, Dec 29 2025'
              noites={6}
              name_hotel='The Sky Hotel'
              categoria_hotel='5 Star'
              nameCity='New York'
              nameCountry='United States'
              imagemHotel='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </View>

          <View style={styles.containerIncludeActivity}>
            <ActivitiesInfo
              include='Activities'
              includeStyle={styles.activities}
              checkIn='Saturday Dec 27, 2025'
              checkOut='Monday, Dec 29 2025'
              duracao={6}
              nome_pacote='Bali Vacation'
              atividades={[]}
              quantidade_pessoas={4}
              tipo='Group'
              idade_minima={18}
            />
          </View>

          <View style={styles.containerTitlePackageDetails}>
            <Text style={styles.textTitlePackageDetails}>Payment Details</Text>
          </View>
          
          <View style={styles.containerPaymentInfo}>
            <PaymentInfoCard 
              paymentInfo={paymentInfo}
              cardTitle='Payment Info'
              iconTitle={<ReceiptIcon size={20} color={themeColors[theme].icon} />}
            />
          </View>

          <View style={styles.containerPriceDetails}>
            <PaymentInfoCard 
              paymentInfo={priceInfo}
              cardTitle='Price Details'
              iconTitle={<CurrencyDollarIcon size={20} color={themeColors[theme].icon} />}
            />
          </View>

          <View style={styles.containerButtonTrip}>
            <View style={styles.containerButtons}>
              <View style={styles.containerButtonRecibo}>
                <TouchableOpacity style={styles.buttonRecibo}>
                  <Text style={styles.textButtonRecibo}>
                    Download Receipt
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerButtonCancel}>
                <TouchableOpacity style={styles.buttonCancel}
                  onPress={() => {}}
                >
                  <Text style={styles.textButtonCancel}>
                    Cancel Booking & Request Refund
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors[theme].background,
      paddingHorizontal: 10,
    },

    containerHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerFilter: {
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backgroundAtivoStyle: {
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 10,
    },

    styleTextButtonActive: {
      color: themeColors[theme].textButton,
    },

    containerScroll: {
      flex: 1,
    },

    containerContent: {
      gap: 15,
      paddingHorizontal: 10,
    },

    containerCardPacket: {
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 10,
    },

    containerTopRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },

    containerImageTop: {
      width: 100,
      height: 100,
    },

    imageTop: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },

    containerNameTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 200,
    },

    textNameTop: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
      wordWrap: 'none',
    },

    containerBottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: themeColors[theme].borderColor,
      paddingVertical: 10,
    },

    containerInfoColumnLeft: {
      flexDirection: 'column',
      borderRightWidth: 1,
      borderRightColor: themeColors[theme].borderColor,
      paddingRight: 15,
      gap: 10,
    },

    containerLocationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textLocationLeft: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerDateLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textDateLeft: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerPassengersLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textPassengersLeft: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerInfoColumnRight: {
      flexDirection: 'column',
      paddingLeft: 15,
      gap: 10,
    },

    containerFlightsRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textFlightsRight: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerAccomodationRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textAccomodationRight: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerActivityRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textActivityRight: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerTourGuide: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 15,
    },

    containerInfoTourGuide: {
      flexDirection: 'row',
      gap: 15,
      alignItems: 'center',
    },

    containerImageTourGuide: {
      width: 50,
      height: 50,
    },

    imageTourGuide: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },

    containerNameGuide: {
      flexDirection: 'column',
      gap: 5,
    },

    textNameTourGuide: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textDescriptionTourGuide: {
      fontSize: 16,
      color: themeColors[theme].textSecondary,
    },

    containerButtonTalkGuide: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
      borderRadius: 50,
      backgroundColor: themeColors[theme].realceLightBlue,
    },

    containerItinerary: {
      flexDirection: 'column',
      gap: 10,
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 15,
    },

    containerTitlePackageDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    textTitlePackageDetails: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerIncludeFlight: {
      flexDirection: 'column',
      width: '100%',
    },

    flightReturn: {
      backgroundColor: 'transparent',
    },

    containerIncludeAccomodation: {
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      
    },

    textInclude: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
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

    containerPaymentInfo: {
      flexDirection: 'column',
      gap: 10,
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 15,
    },

    containerPriceDetails: {
      
      flexDirection: 'column',
      gap: 10,
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 15,
    },

    containerButtonTrip: {
      maxWidth: '100%',
      flex:1,
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerButtons: {
      flexDirection: 'column',
      gap: 20,
    },

    containerButtonRecibo: {
      flex:1,

    },

    buttonRecibo: {
      borderColor: themeColors[theme].realceBlue,
      borderWidth: 1,
      borderRadius: 30,
      padding:15,
      alignItems:'center',

    },

    textButtonRecibo: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].realceBlue,
    },


    containerButtonCancel: {
      flex:1,
    },

    buttonCancel: {
      borderColor: themeColors[theme].colorRed,
      borderWidth: 1,
      borderRadius: 30,
      padding:15,
      alignItems:'center',
    },

    textButtonCancel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].colorRed,
    },

    
    containerInfoPayment: {
      flexDirection: 'column',
      gap: 10,
    },

    textInfoPayment: {
      fontSize: 16,
    },



    


  });
