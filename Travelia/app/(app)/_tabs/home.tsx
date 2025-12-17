import {  ScrollView, StyleSheet, View } from 'react-native';

// Importe suas cores e o hook useTheme
import { themeColors, ThemeName } from '@/constants/theme'; 
import { useTheme } from '../../../context/themeProvider'; 
import { useMemo } from 'react';
import {  CaretRightIcon} from 'phosphor-react-native';
import { DadosViagem, PacoteViagem } from '@/assets/types';

// Import componentes
import pacotes from '../../../assets/data/packetTrips.json';
import HomeHeader from '@/components/header/homeHeader';
import UserGreeting from '@/components/home/userGreeting';
import RowList from '@/components/home/rowList';

// Declaração do Json

const dadosCompletos: DadosViagem = pacotes as DadosViagem;

const listaDePacotes: PacoteViagem[] = dadosCompletos.pacotes;

export default function HomeScreen() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView style={styles.containerScroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containerContentHome}>
            <UserGreeting userName="John Doe" />
          
            <RowList
              data={listaDePacotes}
              start={0}
              end={5}
            />
        
            <RowList
              title="Weekend Getaways"
              buttonMore="See more"
              data={listaDePacotes}
              start={5}
              end={10}
              icon={
                <CaretRightIcon 
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                />
              }
            />

            <RowList
              title="Hidden Gems Nearby"
              buttonMore="See more"
              data={listaDePacotes}
              start={10}
              end={15}
              icon={
                <CaretRightIcon 
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                />
                } 
            />

            <RowList
              title="Travelia Recommendations"
              buttonMore="See more"
              data={listaDePacotes}
              start={15}
              end={20}
              icon={
                <CaretRightIcon 
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                />
                } 
            />

            <RowList
              title="People Also Like"
              buttonMore="See more"
              data={listaDePacotes}
              start={20}
              end={25}
              icon={
                <CaretRightIcon 
                  size={20} 
                  color={themeColors[theme].realceBlue} 
                />
                } 
            />
          
          
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
    gap: 5,
  },


  containerScroll: {
    flex: 1,
  },

  containerContentHome: {
    marginTop: 10,
  },

  
  tituloCards: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  containerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

  },

  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themeColors[theme].realceBlue,
  },

  containerRecomended: {
    
    
  },

  containerWeekend: {
    
  },




});
