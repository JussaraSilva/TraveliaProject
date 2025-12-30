import { PromoType } from '@/assets/types/promoType/promo';
import CardDetailsGlobal from '@/components/cards/cardDetailsGlobal';
import { CardGlobal } from '@/components/cards/cardGlobal';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { CaretLeftIcon,  SealPercentIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

import promocoes from '@/assets/data/codePromoData.json';


export default function Discount() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const listaPromos: PromoType[] = promocoes.promocoes;

  const selectVouchers = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal
          titlePage='Discount / Vouchers'
          leftIcon={<CaretLeftIcon size={24} color={themeColors[theme].icon} />}
          onPressLeftIcon={() => {}}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.containerCodePromo}>
          <CardDetailsGlobal
            title='Have a Promo Code?'
            onPressIcon={selectVouchers}
            showDivider
          >
            <View style={styles.containerCode}>
              <View style={styles.codeInput}>
                <TextInput
                  placeholder='Enter Code Here'
                  style={styles.inputCode}
                  placeholderTextColor={themeColors[theme].textSecondary}
                  autoCapitalize='characters'
                />
              </View>
              <View style={styles.codeButton}>
                <TouchableOpacity style={styles.buttonCode}>
                  <Text style={styles.textCode}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CardDetailsGlobal>
        </View>

        <View style={styles.containerCardsPromos}>
          <FlatList 
            style={styles.flatCards}
            data={listaPromos}
            renderItem={({ item }) => (
              <CardGlobal
                key={item.id}
                variant='icon-text-icon'
                leftIcon={<SealPercentIcon size={30} weight ="fill" color={themeColors[theme].textButton}/>}
                contentCardStyle={styles.cardStyleRow}
                textTitle={item.nome}
                textDescription={item.descricao}
                onPress={() => {}}
            />
            )}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => <View style={{ height: 20}} />}
            contentContainerStyle={{ paddingBottom: 105}}
            showsVerticalScrollIndicator={false}
          />
          
        </View>
      </View>
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
      marginBottom: 20,
    },

    contentContainer: {},

    containerCodePromo: {
      width: '100%',
    },

    containerCode: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },

    codeInput: {
      width: '70%',
    },

    inputCode: {
      backgroundColor: themeColors[theme].backgroundCard,
      padding: 10,
      borderRadius: 30,
      color: themeColors[theme].textPrimary,
      borderWidth: 1,
      borderColor: themeColors[theme].borderColor,
    },

    codeButton: {
      width: '30%',
    },

    buttonCode: {
      backgroundColor: themeColors[theme].realceBlue,
      padding: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },

    textCode: {
      color: themeColors[theme].textButton,
      fontWeight: 'bold',
    },

    cardStyleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    containerCardsPromos: {
      width: '100%',
      
      marginTop: 10,
      gap: 10,
    },

    cardActive: {
      backgroundColor: themeColors[theme].realceBlue,
    },

    flatCards: {
      
      marginBottom: 250,
    },
  });
