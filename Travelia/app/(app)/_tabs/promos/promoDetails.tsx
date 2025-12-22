import { ButtonGlobal } from "@/components/buttons/buttonGlobal";
import { CardGlobal } from "@/components/cards/cardGlobal";
import HeaderGlobal from "@/components/header/headerGlobal";
import DescriptionPacket from "@/components/list/descriptionPacket";
import { DateText } from "@/components/utils/formatDate";
import { PriceText } from "@/components/utils/priceText";
import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CaretLeftIcon, CopyIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { View,  StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";




export default function PromoDetails() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const params = useLocalSearchParams<{ promo?: string }>();
  
    const pacoteStr = params.promo ?? '{}';
  
    let pacoteObj;
    try {
      pacoteObj = JSON.parse(pacoteStr);
    } catch {
      pacoteObj = {};
    }
  


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderGlobal 
          titlePage={'Promo'}
          showLogo={false}
          containerReverse={{flexDirection: 'row-reverse'}}
          iconHeader={
            <CaretLeftIcon 
              size={30} 
              color={themeColors[theme].icon} 
              weight="light" 
            />}
          onPressIcon={router.back}
        />
      </View>

      <ScrollView 
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}
      >

      <View style={styles.containerContent}>
        <View style={styles.containerCard}> 
          <CardGlobal 
            variant={'image-text'}
            contentCardStyle={styles.styleContainerCard}
            imagem={pacoteObj.imagem}
            textTitle={pacoteObj.nome}
            textDescription={pacoteObj.descricao}
          />
        </View>

        <View style={styles.containerPromoCode}>
           <View style={styles.containerCode}>
              <Text style={styles.textCodeTitle}>
                Código da Promoção
              </Text>

            <View style={styles.containerCodeCopy}>
                <Text style={styles.textCode}
                  selectable
                >
                  {pacoteObj.codigo}
                </Text>

              <TouchableOpacity style={styles.buttonCopy}>
                <CopyIcon 
                  size={20} 
                  color={themeColors[theme].icon} 
                  weight="light" 
                />
              </TouchableOpacity>
            </View>

           </View>
        </View>

        <View style={styles.containerDetailsPromo}>
            <View style={styles.containerDetailsPromoContent}>
              <View style={styles.containerDateValidate}>
                <Text style={styles.textDateValidateTitle}>
                  Data de Validade da Promoção:
                </Text>
                <Text style={styles.textDateValidate}>
                  <DateText value={pacoteObj.validade} 
                    variant={'full'} 
                    textStyle={styles.textDateValidate}
                    />
                  
                </Text>
              </View>
              <View style={styles.containerValorMininum}>
                <Text style={styles.textValorMininumTitle}>
                  Valor Mínimo Gasto:
                </Text>
                <Text style={styles.textValorMininum}>
                  <PriceText value={pacoteObj.valor_minimo} />

                </Text>
              </View>
              <View style={styles.containerUseInstructions}>
                <Text style={styles.textUseInstructionsTitle}>
                  Instruções de Uso:
                </Text>
                <Text style={styles.textUseInstructions}>
                  {pacoteObj.instrucoes}
                </Text>
              </View>              
              <DescriptionPacket
                  includeList={pacoteObj.termos_condicoes}
                  showDescriptionContainer={false}
                  titleList={'Termos e Condições:'}
                  containerStyle={styles.containerTerms}
                  itemTextStyle={styles.textTerms}
              />

              <DescriptionPacket
                  includeList={pacoteObj.outras_informacoes}
                  showDescriptionContainer={false}
                  titleList={'Outras Informações:'}
                  containerStyle={styles.containerOtherInfo}
                  itemTextStyle={styles.textOthers}
              />

            </View>
        </View>


      </View>

      <View style={styles.containerButton}>
        <ButtonGlobal 
          title="Use Promo"
          onPress={() => {}}
          style={styles.button}
        />

      </View>

      </ScrollView>

    </View>
  )
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      paddingHorizontal: 10,
    },

    headerContainer: {
      width: '100%',
      alignItems: 'stretch',
      justifyContent: 'center',
    },

    containerScroll: {
      flex: 1,
    },

    containerContent: {
      flexDirection: 'column',
      gap: 10,
      alignItems: 'stretch',
      maxWidth: '100%',
      justifyContent: 'center',

    },

    containerCard: {
      width: '100%',
      alignItems: 'stretch',
      justifyContent: 'center',
    },

    styleContainerCard: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'space-between',
    },

    containerPromoCode: {
      backgroundColor: themeColors[theme].background,
      borderRadius: 10,
      maxWidth: '100%',
      justifyContent: 'center',
      
    },

    containerCode: {
      flexDirection: 'column',
      gap: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      
    },

    containerCodeCopy: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textCodeTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    textCode: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    buttonCopy: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerDetailsPromo: {
      maxWidth: '100%',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },

    containerDetailsPromoContent: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 15,
      marginTop: 10,
    },

    containerDateValidate: {
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      justifyContent: 'flex-start',
    },

    textDateValidateTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    
    textDateValidate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerValorMininum: {
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      justifyContent: 'flex-start',
    },

    textValorMininumTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    
    textValorMininum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary
    },

    containerUseInstructions: {
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      justifyContent: 'center',
    },

    textUseInstructionsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    
    textUseInstructions: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary
    },

    containerTerms: {
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },

    textTermsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    
    textTerms: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary
    },

    containerOtherInfo: {
      flexDirection: 'column',
      gap: 5,
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },

    textOtherTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    
    textOthers: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary
    },

    containerButton: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginTop: 20,
      marginBottom: 20,
    },

    button: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 15,
      justifyContent: 'center',
    },


});