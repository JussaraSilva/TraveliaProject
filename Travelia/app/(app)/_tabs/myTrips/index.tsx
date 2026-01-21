import React, { useMemo, useState, useCallback } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { CalendarIcon, CaretRightIcon, MapPinIcon } from 'phosphor-react-native';

import { PacoteViagem } from '@/assets/types/bookingType';
import ButtonFilter from '@/components/buttons/buttonFilters';
import HeaderGlobal from '@/components/header/headerGlobal';
import { Logo } from '@/components/others/logo';
import { DateText } from '@/components/utils/date/formatDate';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { getTrips } from "@/services/tripStorage";

export default function MyTrips() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelButton = ['OnGoing', 'Completed', 'Canceled'];
  const [activeFilter, setActiveFilter] = useState(0);
  const [trips, setTrips] = useState<PacoteViagem[]>([]);

  // Carrega as viagens toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      async function fetchTrips() {
        console.log("--- 🕵️ DEBUG MYTRIPS ---");
        const allTrips = await getTrips();
        console.log("1. Dados brutos do Storage:", allTrips);
      
      if (allTrips.length > 0) {
        console.log("2. Primeiro item da lista (ID):", allTrips[0].id);
        console.log("3. Status da data do primeiro item:", allTrips[0].estadia.checkout);
      } else {
        console.log("⚠️ Storage retornou um array VAZIO.");
      }

        setTrips(allTrips || []);
      }
      fetchTrips();
    }, [])
  );

  // Lógica para filtrar as viagens com base no botão selecionado
  const filteredTrips = useMemo(() => {
  const agora = new Date();
  
  return trips.filter((pacote) => {
    // Tenta converter a string de data (removendo o dia da semana se necessário)
    // Ex: "Domingo, 16 de Junho de 2024" -> "16 de Junho de 2024"
    const dataLimpa = pacote.estadia.checkout.split(',').pop()?.trim() || "";
    
    // Nota: O ideal é que as datas no banco estejam em ISO (YYYY-MM-DD)
    // Mas vamos forçar uma exibição para você ver os cards agora:
    const dataCheckout = new Date(dataLimpa);

    // Se a data for inválida (devido ao formato PT-BR), 
    // vamos mostrar no "OnGoing" para você validar que o card aparece
    if (isNaN(dataCheckout.getTime())) {
      return activeFilter === 0; 
    }

    if (activeFilter === 0) { // OnGoing
      return dataCheckout >= agora;
    } else if (activeFilter === 1) { // Completed
      return dataCheckout < agora;
    }
    
    return true;
  });
}, [trips, activeFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage='My Trips'
          leftIcons={[<Logo key="logo" size={28}  showText={false} />]}
          rightIcons={[<CalendarIcon key="calendar" size={28} color={themeColors[theme].icon} />]}
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

      <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
        <View style={styles.containerCards}>
          {filteredTrips.length > 0 ? (
            filteredTrips.map((pacote, index) => (
              <TouchableOpacity
                key={pacote.id || index}
                style={styles.containerCardRow}
                onPress={() => {
                  router.push({
                    pathname: '/(app)/_tabs/myTrips/tripDetails',
                    params: { pacote: JSON.stringify(pacote) },
                  });
                }}
              >
                <View style={styles.containerImagem}>
                  <Image
                    source={{ uri: pacote.imagens[0] }}
                    style={styles.imagem}
                  />
                </View>

                <View style={styles.containerInformacoes}>
                  <View style={styles.containerNomePacote}>
                    <Text style={styles.textNomePacote} numberOfLines={2}>
                      {pacote.nome_pacote ?? 'Pacote não encontrado'}
                    </Text>
                  </View>
                  <View style={styles.containerData}>
                    <Text style={styles.textDataCheckIn}>
                      <DateText value={pacote.estadia.checkin} variant="short" />
                    </Text>
                    <Text style={{ color: themeColors[theme].textSecondary }}>-</Text>
                    <Text style={styles.textDataCheckOut}>
                      <DateText value={pacote.estadia.checkout} variant="short" />
                    </Text>
                  </View>
                  <View style={styles.containerLocation}>
                    <MapPinIcon size={20} color={themeColors[theme].realceBlue} weight='duotone'/>
                    <Text style={styles.textLocation}>
                      {pacote.destino.nome}, {pacote.destino.pais}
                    </Text>
                  </View>
                </View>

                <View style={styles.containerIcon}>
                  <CaretRightIcon size={20} color={themeColors[theme].realceBlue} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: themeColors[theme].textSecondary }}>
                No trips found for this category.
              </Text>
            </View>
          )}
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
      paddingBottom: 20,
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
      gap: 5,
      marginLeft: 10,
    },
    containerNomePacote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textNomePacote: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    containerData: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    textDataCheckIn: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors[theme].textSecondary,
    },
    textDataCheckOut: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors[theme].textSecondary,
    },
    containerLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    textLocation: {
      fontSize: 14,
      color: themeColors[theme].textSecondary,
    },
    containerIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
    },
  });