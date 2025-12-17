
import ButtonFilter from '@/components/buttons/buttonFilters';
import {CardGlobal} from '@/components/cards/cardGlobal';
import HeaderGlobal from '@/components/header/headerGlobal';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useMemo, useState } from 'react';
import {  StyleSheet, View } from 'react-native';


export default function TabTwoScreen() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelButton = ['All', 'Discount', 'Cashback','Partneship'];
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <View style={styles.container}>
      <HeaderGlobal />
      <CardGlobal 
        variant={'icon-text-icon'}
        contentDirection={styles.contentDirection}
        textTitle='Have a Promo Code'
        textDescription='Enter your Promo Code'
      />

      <ButtonFilter 
        labels={labelButton}
        activeIndex={activeFilter}
        onPress={setActiveFilter}
        backgroundAtivoStyle={{ backgroundColor: themeColors[theme].realceBlue }}
        activeTextStyle={{ color: themeColors[theme].textButton }}
      />

      <CardGlobal 
        variant={'image-text'} 
        contentDirection={styles.contentDirectionImage}
        textTitle='Best Deal: 20% off'
        textDescription='End of the year promo, 20% discount on all bookings'
      />
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  container: {
    backgroundColor: themeColors[theme].background,
    paddingHorizontal: 10,
    gap: 10,
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
  },
  


});
