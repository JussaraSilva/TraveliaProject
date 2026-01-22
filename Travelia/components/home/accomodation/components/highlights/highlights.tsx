import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { themeColors, ThemeName } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

interface PropsHighlights {
  vista: string;
  temVaranda: boolean | string;
  temBanheiroPrivativo: boolean;
}


export default function Highlights ({vista, temVaranda, temBanheiroPrivativo}: PropsHighlights) {

  const { theme, styles } = useThemedStyles(createStyles);


  return (

          <View style={styles.highlightRow}>
            {vista && (
              <View style={styles.badge}>
                <MaterialCommunityIcons name="waves" size={14} color={themeColors[theme].icon} />
                <Text style={styles.badgeText}>Vista: {vista}</Text>
              </View>
            )}
            {temVaranda && (
              <View style={styles.badge}>
                <MaterialCommunityIcons name="balcony" size={14} color={themeColors[theme].icon} />
                <Text style={styles.badgeText}>Varanda</Text>
              </View>
            )}
            {temBanheiroPrivativo && (
              <View style={styles.badge}>
                <MaterialCommunityIcons name="shower" size={14} color={themeColors[theme].icon} />
                <Text style={styles.badgeText}>Privativo</Text>
              </View>
            )}
          </View>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create({ 

  highlightRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      marginTop: 5,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors[theme].background, // Ou um tom bem claro da cor primária
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors[theme].borderColor, // Ajuste conforme seu theme
      gap: 6,
    },
    badgeText: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors[theme].textPrimary,
    },
})
