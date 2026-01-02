import { PacoteViagem } from '@/assets/types/bookingType';
import ButtonFilter from '@/components/buttons/buttonFilters';
import HeaderGlobal from '@/components/header/headerGlobal';
import { Logo } from '@/components/others/logo';
import { DateText } from '@/components/utils/formatDate';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { router, useLocalSearchParams } from 'expo-router';
import {
  CalendarIcon,
  CaretRightIcon,
  MapPinIcon,
} from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MyTrips() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelButton = ['OnGoing', 'Completed', 'Canceled'];
  const [activeFilter, setActiveFilter] = useState(0);

  const params = useLocalSearchParams<{
      pacote?: string;
      paymentId?: string;
      paymentTitle?: string;
      paymentSubtitle?: string;
      discountId?: string;
      discountTitle?: string;
      discountSubtitle?: string;
    }>();

  const pacoteObj: PacoteViagem | null = params.pacote
    ? JSON.parse(
        Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
      )
  : null;

  const handleNextPage = () => {
  router.push({
    pathname: '/(app)/_tabs/myTrips/tripDetails',
    params: {
      pacote: JSON.stringify(pacoteObj),
    },
  });
};

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage='My Trips'
          leftIcon={<Logo size={28} showText={false} />}
          rightIcon={<CalendarIcon size={28} color={themeColors[theme].icon} />}
          onPressLeftIcon={() => {}}
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
        <View style={styles.containerCards}>
          <TouchableOpacity
            style={styles.containerCardRow}
            onPress={handleNextPage}
          >
            <View style={styles.containerImagem}>
              <Image
                source={{
                  uri: pacoteObj?.imagens[0],
                }}
                style={styles.imagem}
              />
              
            </View>
            <View style={styles.containerInformacoes}>
              <View style={styles.containerNomePacote}>
                <Text
                  style={styles.textNomePacote}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
                  {pacoteObj?.nome_pacote ?? 'Pacote não encontrado'}
                </Text>
              </View>
              <View style={styles.containerData}>
                <Text style={styles.textDataCheckIn}>
                  <DateText 
                    value={pacoteObj?.estadia.checkin ?? 'Data nao encontrada'} 
                    variant='short'
                  />
                  
                </Text>
                <Text>-</Text>
                <Text style={styles.textDataCheckOut}>
                  <DateText 
                    value={pacoteObj?.estadia.checkout ?? 'Data nao encontrada'} 
                    variant='short'
                  />
                </Text>
              </View>
              <View style={styles.containerLocation}>
                <MapPinIcon
                  size={20}
                  color={themeColors[theme].realceBlue}
                  weight='duotone'
                />
                <Text style={styles.textLocation}>
                  {pacoteObj?.destino.nome}, {pacoteObj?.destino.pais}
                </Text>
              </View>
            </View>

            <View style={styles.containerIcon}>
              <CaretRightIcon size={20} color={themeColors[theme].realceBlue} />
            </View>
          </TouchableOpacity>
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

    stylecontainerHeader: {
      flexDirection: 'row',
    },

    containerFilter: {
      marginTop: 10,
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

    containerCards: {
      marginTop: 10,
      gap: 10,
    },

    containerCardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 10,
    },

    containerImagem: {
      width: 100,
      height: 100,
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 10,
    },

    imagem: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },

    containerInformacoes: {
      flex: 1,
      gap: 10,
      marginLeft: 10,
    },

    containerNomePacote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 200,
    },

    textNomePacote: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,

      // overflow: 'hidden',
      wordWrap: 'none',
    },

    containerData: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 5,
      justifyContent: 'flex-start',
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


    containerLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textLocation: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerIcon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
