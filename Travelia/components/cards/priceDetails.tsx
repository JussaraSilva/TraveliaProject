import { StyleSheet, View, Text } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '@/context/themeProvider';
import { themeColors, ThemeName } from '@/constants/theme';
import CardDetailsGlobal from '@/components/cards/cardDetailsGlobal';
import { PriceText } from '@/components/utils/priceText';


type PriceDetailsProps = {
  labelRowPrice: string;
  qtdPessoas: number;
  precoPorPessoa: number;
  moeda: string;
  parcelamento: string;
  precoTotal: number;
  valorDesconto?: number;
  leftIconPriceDetails?: React.ReactNode;
};


export default function PriceDetailsResume({
  labelRowPrice,
  qtdPessoas,
  precoPorPessoa,
  moeda,
  parcelamento,
  precoTotal,
  leftIconPriceDetails,
  valorDesconto,
}: PriceDetailsProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  


  return (
    <View style={styles.containerPriceDetails}>
      <CardDetailsGlobal
        title={'Price Details'}
        leftIcon={leftIconPriceDetails}
      >
        <View style={styles.gridPriceDetails}>
          <View style={styles.rowPriceDetails}>
            <Text style={styles.labelPriceDetails}>
              {labelRowPrice} ({qtdPessoas} Passengers)
            </Text>
            <Text style={styles.valuePriceDetails}>
              <PriceText
                value={precoPorPessoa}
                currency={moeda}
                style={styles.textPriceValue}
              />
            </Text>
          </View>

          <View style={styles.rowPriceDetails}>
            <Text style={styles.labelPriceDetails}>Travel Insurance</Text>
            <Text style={styles.valuePriceDetails}>
              R$ 40,00
            </Text>
          </View>

          <View style={styles.rowPriceDetails}>
            <Text style={styles.labelPriceDetails}>Tax</Text>
            <Text style={styles.valuePriceDetails}>
              R$ 10,00
            </Text>
          </View>

          <View style={styles.rowPriceDetails}>
            <Text style={styles.labelPriceDetails}>Price Parcel</Text>
            <Text style={styles.valuePriceDetails}>
              {parcelamento}
            </Text>
          </View>

          <View style={styles.rowPriceDetails}>
            <Text style={styles.labelPriceDetails}>Discount</Text>
            <Text style={styles.valuePriceDetails}>
              <PriceText
                value={valorDesconto}
                currency={moeda}
                style={styles.textPriceValue}
              />
            </Text>
          </View>

          <View style={styles.rowPriceDetailsTotal}>
            <Text style={styles.labelPriceDetails}>Total Price</Text>
            <Text style={styles.valuePriceDetails}>
              <PriceText
                value={precoTotal}
                currency={moeda}
                style={styles.textPriceValue}
              />
            </Text>
          </View>
        </View>
      </CardDetailsGlobal>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerPriceDetails: {
      width: '100%',
      marginBottom: 30,
    },

    gridPriceDetails: {
      marginTop: 5,
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
