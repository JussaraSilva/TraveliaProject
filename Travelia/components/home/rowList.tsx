
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CardPacketTrips from '../details/cardPacketTrips';
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useMemo } from 'react';

interface RowListProps {
  title?: string;
  data: any[];
  start: number;
  end: number;
  buttonMore?: string;
  icon?: React.ReactNode
}


const  RowList = ({ title, data, start, end, buttonMore, icon } : RowListProps) => {
    const { theme } = useTheme(); 
    const styles = useMemo(() => createStyles(theme), [theme]);

  return(
    <View style={styles.containerContentHome}>
      <View style={styles.containerTitleSection}>
        <Text style={styles.tituloCards}>{title}</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>{buttonMore}</Text>
          {icon}
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.slice(start, end)}
        style={styles.flatCards}
        renderItem={({ item }) => 
        <CardPacketTrips pacote={item} />}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
    
}

export default RowList

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({


    containerContentHome: {
      gap: 5,
    },

    flatCards: {
      marginTop: 0,
    },

    tituloCards: {
        fontSize: 20,
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
    
    
  })
