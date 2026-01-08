import { PromoType } from '@/assets/types/promoType/promo';
import CardDetailsGlobal from '@/components/cards/cardDetailsGlobal';
import { CardGlobal } from '@/components/cards/cardGlobal';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { CaretLeftIcon,  CheckCircleIcon,  SealPercentIcon } from 'phosphor-react-native';
import { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

import promocoes from '@/assets/data/codePromoData.json';
import { router, useLocalSearchParams } from 'expo-router';




export default function Discount() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{ 
    pacote?: string
    paymentId?: string,
    paymentTitle?: string,
    paymentSubtitle?: string,
  }>();

  const listaPromos: PromoType[] = promocoes.promocoes;
  const selectVouchers = () => {
    router.push({
      pathname: '/(app)/_tabs/promos/codePromoDetails',
    });
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectDiscount = (item: PromoType) => {
  setSelectedId(item.id);

  setTimeout(() => {
    router.push({
      pathname: '/(app)/_tabs/home/payment',
      params: {
        pacote: params.pacote,
        discountId: String(item.id),
        discountTitle: item.nome,
        discountSubtitle: item.descricao,
        discountValor: String(item.valor_desconto),
        discountType: item.tipo_desconto,
        // Repassa o pagamento para não perdê-lo
          paymentId: params.paymentId,
          paymentTitle: params.paymentTitle,
          paymentSubtitle: params.paymentSubtitle,
      },
    });
  }, 150);
  };

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
          renderItem={({ item }) => {
            const isActive = selectedId === item.id;

            return (
              <CardGlobal
                variant="icon-text-icon"
                leftIcon={
                  <SealPercentIcon
                    size={30}
                    weight="fill"
                    color={themeColors[theme].textButton}
                  />
                }
                rightIcon={
                  isActive ? (
                    <CheckCircleIcon
                      size={26}
                      color={themeColors[theme].realceBlue}
                    />
                  ) : null
                }
                textTitle={item.nome}
                textDescription={item.descricao}
                contentCardStyle={[
                  styles.cardStyleRow,
                  isActive && styles.cardActive, // 👈 seleção visual
                ]}
                onPress={() => handleSelectDiscount(item)}
              />
            );
          }}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={{ paddingBottom: 105 }}
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
      paddingHorizontal: 20,
    },

    containerCardsPromos: {
      width: '100%',
      
      marginTop: 10,
      gap: 10,
    },

    cardActive: {
      borderWidth: 1,
      borderColor: themeColors[theme].realceBlue,
    },

    flatCards: {
      
      marginBottom: 250,
    },
  });
