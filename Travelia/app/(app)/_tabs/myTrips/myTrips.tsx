import ButtonFilter from '@/components/buttons/buttonFilters';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme'
import { useTheme } from '@/context/themeProvider';
import { CalendarIcon, CaretRightIcon, MapPinIcon } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MyTrips() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelButton = ['OnGoing', 'Completed', 'Canceled'];
  const [activeFilter, setActiveFilter] = useState(0);


  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal titlePage='Minhas Reservas'
          showLogo={true}
          containerReverse={styles.stylecontainerHeader}
          iconHeader={
            <CalendarIcon 
              size={30} 
              color={themeColors[theme].icon} 
              weight="light" 
            />
          }
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
          <TouchableOpacity style={styles.containerCardRow}>
            <View style={styles.containerImagem}>

            </View>
            <View style={styles.containerInformacoes}>
              <View style={styles.containerNomePacote}>
                <Text style={styles.textNomePacote}
                  numberOfLines={2} 
                  ellipsizeMode="tail"
                >
                  Teste com um nome de Pacote Bem grande para ocupar espaço  
                </Text>
              </View>
              <View style={styles.containerData}>
                <Text style={styles.textDataIdaVolta}>
                  Dec 27 - Dec 29, 2025
                </Text>
              </View>
              <View style={styles.containerLocation}>
                <MapPinIcon
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                  weight="duotone" 
                />
                <Text style={styles.textLocation}>
                  Bali, Indonesia
                </Text>
              </View>


            </View>

            <View style={styles.containerIcon}>
                <CaretRightIcon 
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                />
            </View>
          </TouchableOpacity>
            
        </View>


        

      </ScrollView>
      
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create ({
    container : {
      flex: 1,
      backgroundColor: themeColors[theme].background,
      paddingHorizontal: 10,
    },

    containerHeader : {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    stylecontainerHeader : {
      flexDirection: 'row',
    },

    containerFilter : {
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backgroundAtivoStyle : {
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 10,
    },

    styleTextButtonActive : {
      color: themeColors[theme].textButton,
    },

    containerScroll : {
      flex: 1,
    },

    containerCards : {
      marginTop: 10,
      gap: 10,
    },

    containerCardRow : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 10,
    },

    containerImagem : {
      width: 100,
      height: 100,
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 10,
    },

    containerInformacoes : {
      flex: 1,
      gap: 10,
      marginLeft: 10,
    },

    containerNomePacote : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 200,
    },

    textNomePacote : {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
      
      // overflow: 'hidden',
      wordWrap: 'none',
    },

    containerData : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    textDataIdaVolta : {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerLocation : {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    textLocation : {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerIcon : {
      alignItems: 'center',
      justifyContent: 'center',
    },




})