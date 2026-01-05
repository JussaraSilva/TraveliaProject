import ButtonFilter from '@/components/buttons/buttonFilters';
import PaymentInfoCard from '@/components/cards/paymentInfoCard';
import AccomodationInfo from '@/components/details/accomodationInfo';
import ActivitiesInfo from '@/components/details/activitiesInfo';
import FlightDepartReturn from '@/components/details/flightDepartReturn';
import HeaderGlobal from '@/components/header/headerGlobal';
import { DateText } from '@/components/utils/formatDate';
import { PriceText } from '@/components/utils/priceText';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function TripDetails() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const router = useRouter();

  const labelButton = ['Package', 'E-Ticket'];
  const [activeFilter, setActiveFilter] = useState(0);

  
  const params = useLocalSearchParams<{
    pacote?: string;
  }>();

  
  
  const pacoteFinal = params.pacote
  ? JSON.parse(
      Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
    )
  : null;


  
  
  const paymentInfo = [
  { label: 'Status', value: 'Paid', type: 'badge' },
  {
    label: 'Payment Method',
    value: `${pacoteFinal?.pagamento?.subtitle ?? 'None'}`,

  },
  { label: 'Date & Time', value: 
  <DateText 
  value={pacoteFinal?.data_reserva}
  variant='short'/> },
  { label: 'Booking ID', value: 'BID122025BKG', copy: true },
  { label: 'Transaction ID', value: 'TID094125TRX', copy: true },
  { label: 'Merchant ID', value: 'MID374028MRC', copy: true },
];




  const priceInfo = [
  {
    label: `${pacoteFinal?.viajantes.quantidade ?? 0} Passengers`,
    value: <PriceText 
      value={pacoteFinal?.preco.total ?? 0}
      currency={pacoteFinal?.preco.moeda ?? 'BRL'}
    />,
  },
  {
    label: 'Travel Insurance',
    value: 'R$ 40,00',
  },
  {
    label: 'Tax',
    value: 'R$ 10,00',
  },
  {
    label:  'Desconto Aplicado',
    value: pacoteFinal.desconto?.title ?? 'None',
  },
  {
    label:  'Valor Desconto',
    value: pacoteFinal?.desconto?.valorDesconto ?? 0,
  },
  {
    label: 'Total Price',
    value: <PriceText 
      value={pacoteFinal?.preco.total ?? 0 + 40 + 10} 
      currency={pacoteFinal?.preco.moeda ?? 'BRL'}
    />,
  },
];


  if (!pacoteFinal) {
  return (
    <View>
      <Text>Pacote não encontrado</Text>
    </View>
  );
}

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
                    uri: pacoteFinal?.imagens[0],
                  }}
                  style={styles.imageTop}
                />
              </View>
              <View style={styles.containerNameTop}>
                <Text style={styles.textNameTop} numberOfLines={3}>
                  {pacoteFinal?.nome_pacote}
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
                  <Text style={styles.textLocationLeft}>
                    {pacoteFinal?.destino.nome}, {pacoteFinal?.destino.pais}
                  </Text>
                </View>
                <View style={styles.containerDateLeft}>
                  <CalendarDotsIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <View style={styles.containerDatas}>
                    <Text style={styles.textDataCheckIn}>
                      <DateText
                        value={
                          pacoteFinal?.estadia.checkin ?? 'Data nao encontrada'
                        }
                        variant='short'
                      />
                    </Text>
                    <Text style={styles.textDataCheckOut}>
                      <DateText
                        value={
                          pacoteFinal?.estadia.checkout ?? 'Data nao encontrada'
                        }
                        variant='short'
                      />
                    </Text>
                  </View>
                </View>
                <View style={styles.containerPassengersLeft}>
                  <UsersIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textPassengersLeft}>{pacoteFinal?.viajantes.quantidade} Passengers</Text>
                </View>
              </View>
              <View style={styles.containerInfoColumnRight}>
                <View style={styles.containerFlightsRight}>
                  <AirplaneInFlightIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textFlightsRight}>
                    {pacoteFinal?.resumo.quantidade_voos} Flights
                  </Text>
                </View>
                <View style={styles.containerAccomodationRight}>
                  <BuildingApartmentIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textAccomodationRight}>
                    {pacoteFinal?.resumo.quantidade_acomodacoes} Accomodation
                  </Text>
                </View>
                <View style={styles.containerActivityRight}>
                  <PersonSimpleTaiChiIcon
                    size={20}
                    color={themeColors[theme].icon}
                    weight='light'
                  />
                  <Text style={styles.textActivityRight}>{pacoteFinal?.resumo.quantidade_atividades} Activity</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.containerTourGuide}>
            <View style={styles.containerInfoTourGuide}>
              <View style={styles.containerImageTourGuide}>
                <Image
                  source={{
                    uri: pacoteFinal?.resumo.guia_turistico.imagem,
                  }}
                  style={styles.imageTourGuide}
                />
              </View>
              <View style={styles.containerNameGuide}>
                <Text style={styles.textNameTourGuide}>{pacoteFinal?.resumo.guia_turistico.nome}</Text>
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
              dateBoarding={pacoteFinal?.voos.ida.data_completa ?? 'Data nao encontrada'}
              airport_origin={pacoteFinal?.voos.ida.aeroporto_origem ?? 'Data nao encontrada'}
              hour_boarding={pacoteFinal?.voos.ida.horario_partida ?? 'Data nao encontrada'}
              airport_destination={pacoteFinal?.voos.ida.aeroporto_destino ?? 'Aeroporto nao encontrada'}
              hour_destination={pacoteFinal?.voos.ida.horario_chegada ?? 'Horario nao encontrada'}
              numero_voo={pacoteFinal?.voos.ida.numero ?? 'Voo não encontrado'}
              escala={pacoteFinal?.voos.ida.escala ?? 'Sem escala'}
              name_airline={pacoteFinal?.voos.companhia_aerea.nome ?? 'Companhia nao encontrada'}
              logo_airline={pacoteFinal?.voos.companhia_aerea.logo ?? 'Companhia nao encontrada'}
            />
            <FlightDepartReturn
              includeStyle={styles.flightReturn}
              direction='Return'
              dateBoarding={pacoteFinal?.voos.volta.data_completa ?? 'Data nao encontrada'}
              airport_origin={pacoteFinal?.voos.volta.aeroporto_destino ?? 'Aeroporto nao encontrada'}
              hour_boarding={pacoteFinal?.voos.volta.horario_partida ?? 'Horario nao encontrada'}
              airport_destination={pacoteFinal?.voos.ida.aeroporto_destino ?? 'Aeroporto nao encontrada'}
              hour_destination={pacoteFinal?.voos.volta.horario_chegada ?? 'Horario nao encontrada'}
              numero_voo={pacoteFinal?.voos.volta.numero ?? 'Voo não encontrado'}
              escala={pacoteFinal?.voos.volta.escala ?? 'Sem escala'}
              name_airline={pacoteFinal?.voos.companhia_aerea.nome ?? 'Companhia nao encontrada'}
              logo_airline={pacoteFinal?.voos.companhia_aerea.logo ?? 'Companhia nao encontrada'}
            />
          </View>

          <View style={styles.containerIncludeAccomodation}>
            <AccomodationInfo
              include='Accommodation'
              includeStyle={styles.accomodation}
              checkIn={pacoteFinal?.estadia.checkin ?? 'Data nao encontrada'}
              checkOut={pacoteFinal?.estadia.checkout ?? 'Data nao encontrada'}
              noites={pacoteFinal?.estadia.noites ?? 0}
              name_hotel={pacoteFinal?.acomodacao.nome_hotel ?? 'Hotel nao encontrado'}
              tipo_hotel={pacoteFinal?.acomodacao.tipo ?? 'Tipo nao encontrado'}
              categoria_hotel={pacoteFinal?.acomodacao.categoria ?? 'Categoria nao encontrado'}
              nameCity={pacoteFinal?.destino.nome ?? 'Cidade nao encontrada'}
              nameCountry={pacoteFinal?.destino.pais ?? 'País nao encontrada'}
              imagemHotel={pacoteFinal?.acomodacao.imagem_hotel ?? 'Categoria nao encontrado'}
            />
          </View>

          <View style={styles.containerIncludeActivity}>
            <ActivitiesInfo
              include='Activities'
              includeStyle={styles.activities}
              checkIn={pacoteFinal?.estadia.checkin ?? 'Data nao encontrada'}
              checkOut={pacoteFinal?.estadia.checkout ?? 'Data nao encontrada'}
              duracao={6}
              nome_pacote={pacoteFinal?.nome_pacote ?? 'Pacote nao encontrado'}
              atividades={pacoteFinal?.atividades}
              quantidade_pessoas={pacoteFinal?.viajantes.quantidade ?? 0}
              tipo={pacoteFinal?.viajantes.tipo ?? 'Tipo nao encontrado'}
              idade_minima={pacoteFinal?.viajantes.idade_minima ?? 0}
            />
          </View>

          <View style={styles.containerTitlePackageDetails}>
            <Text style={styles.textTitlePackageDetails}>Payment Details</Text>
          </View>

          <View style={styles.containerPaymentInfo}>
            <PaymentInfoCard
              paymentInfo={paymentInfo}
              cardTitle='Payment Info'
              iconTitle={
                <ReceiptIcon size={20} color={themeColors[theme].icon} />
              }
            />
          </View>

          <View style={styles.containerPriceDetails}>
            <PaymentInfoCard
              paymentInfo={priceInfo}
              cardTitle='Price Details'
              iconTitle={
                <CurrencyDollarIcon size={20} color={themeColors[theme].icon} />
              }
            />
          </View>

          <View style={styles.containerButtonTrip}>
            <View style={styles.containerButtons}>
              <View style={styles.containerButtonRecibo}>
                <TouchableOpacity style={styles.buttonRecibo}>
                  <Text style={styles.textButtonRecibo}>Download Receipt</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerButtonCancel}>
                <TouchableOpacity
                  style={styles.buttonCancel}
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

    containerDatas: {
      flexDirection: 'column',
    },

    textDataCheckIn: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    textDataCheckOut: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
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
      flex: 1,
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
      flex: 1,
    },

    buttonRecibo: {
      borderColor: themeColors[theme].realceBlue,
      borderWidth: 1,
      borderRadius: 30,
      padding: 15,
      alignItems: 'center',
    },

    textButtonRecibo: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].realceBlue,
    },

    containerButtonCancel: {
      flex: 1,
    },

    buttonCancel: {
      borderColor: themeColors[theme].colorRed,
      borderWidth: 1,
      borderRadius: 30,
      padding: 15,
      alignItems: 'center',
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
