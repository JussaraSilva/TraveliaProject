import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { DotIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';



type Props = {
  descriptionPacket?: string;
  includeList: string[];
}
export default function DescriptionPacket({
  descriptionPacket,
  includeList,
  

}: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.containerPacoteDescription}>
      <View style={styles.containerTextDescription}>
        <Text style={styles.textDescription}>
        {descriptionPacket}.
        </Text>
      </View>
      
      <View style={styles.servicesIncludeList}>
        <Text style={styles.textTitle}>Packet Services Include:</Text>
        {includeList.map((item, index) => (
          <View key={index}
          style={styles.containerIncludeItem}>
          <DotIcon
            size={25}
            color={themeColors[theme].realceBlue}
            weight='duotone'
          />
          <Text style={styles.textServicesIncludeItem}>
            {item}
          </Text>
        </View>    
        ))}
      </View>
        
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerPacoteDescription: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: themeColors[theme].backgroundCard,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },

    containerTextDescription: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: themeColors[theme].background,
      paddingHorizontal: 20,
      borderRadius: 15,
      paddingVertical: 10,
    },

    textDescription: {
      fontSize: 18,
      color: themeColors[theme].textPrimary,
      marginBottom: 5,
      fontStyle: 'italic',
    },

    servicesIncludeList: {
      flexDirection: 'column',
    },

    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
      marginTop: 5,
    },

    containerIncludeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      
    },

    textServicesIncludeItem: {
      fontSize: 18,
      color: themeColors[theme].textPrimary,
      fontWeight: 'bold',
    },
  });
