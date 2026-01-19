
import ButtonFilter from '@/components/buttons/buttonFilters';
import {CardGlobal} from '@/components/cards/cardGlobal';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {  StyleSheet, View, ScrollView } from 'react-native';



import promocoes from '../../../../assets/data/codePromoData.json';
import { PromoType } from '@/assets/types/promoType/promo';
import { DotsThreeVerticalIcon, CaretRightIcon, SealPercentIcon } from 'phosphor-react-native';
import { Logo } from '@/components/others/logo';





export default function PromosScreen() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelButton = ['All', 'Discount', 'Cashback','Partneship'];
  const [activeFilter, setActiveFilter] = useState(0);

  const listaPromos: PromoType[] = promocoes.promocoes;


  const handleCodePromo = () => {
  router.push({
      pathname: '/(app)/_tabs/promos/codePromoDetails',
    });
  };



  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
            
           <HeaderGlobal
              titlePage="Promos"
              leftIcons={[<Logo key="logo" size={28} showText={false} />
              ]}
              rightIcons={[
                <DotsThreeVerticalIcon
                  key="options"
                  size={24}
                  color={themeColors[theme].icon}
                />
              ]}
              onPressRightIcon={() => {}}
            />

          <CardGlobal 
            variant={'icon-text-icon'}
            contentCardStyle={styles.contentDirection}
            textTitle='Have a Promo Code'
            textDescription='Enter your Promo Code'
            onPress={handleCodePromo}
            leftIcon={<SealPercentIcon
              size={30}
              color={themeColors[theme].textButton}
              weight="fill"
            />}
            rightIcon={<CaretRightIcon
              size={40}
              color={themeColors[theme].icon}
              weight="light"
            />}
          />

          <ButtonFilter 
            labels={labelButton}
            activeIndex={activeFilter}
            onPress={setActiveFilter}
            backgroundAtivoStyle={{ backgroundColor: themeColors[theme].realceBlue }}
            activeTextStyle={{ color: themeColors[theme].textButton }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              {gap: 15, paddingBottom: 20}
            }
            
          >
          {listaPromos.slice(0, 5).map(promo => (
          <CardGlobal
            key={promo.id}
            variant="image-text"
            imagem={promo.imagem}
            contentCardStyle={styles.contentDirectionImage}
            textTitle={promo.nome}
            textDescription={promo.descricao}
            onPress={() => {
              router.push({
                pathname: '/(app)/_tabs/promos/promoDetails',
                params: {
                  promo: JSON.stringify(promo)
                }
              });
            }}
          />
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  container: {
    backgroundColor: themeColors[theme].background,
    paddingHorizontal: 20,
    flex: 1,
  },

  containerContent: {
    gap: 10,
    flex: 1,
  },

  contentDirection: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  contentDirectionImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  


});
