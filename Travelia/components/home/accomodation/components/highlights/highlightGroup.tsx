import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

interface HighlightGroupProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label?: string; // Título opcional (ex: "Idiomas:")
  value: string | string[] | boolean; // Aceita múltiplos tipos
  showIf?: boolean; // Condição para exibir (ex: pet_friendly)
}

export default function HighlightGroup({ icon, label, value, showIf = true }: HighlightGroupProps) {
  const { theme, styles } = useThemedStyles(createStyles);

  if (!showIf || value === false) return null;

  // Transforma tudo em array para facilitar a renderização unificada
  const items = Array.isArray(value) ? value : [String(value === true ? label : value)];

  return (
    <View style={styles.groupContainer}>
      <MaterialCommunityIcons name={icon} size={16} color={themeColors[theme].icon} style={styles.mainIcon} />
      <View style={styles.badgeWrapper}>
        {items.map((item, index) => (
          <View key={index} style={styles.badge}>
            {label && Array.isArray(value) && index === 0 && (
               <Text style={[styles.badgeText, { fontWeight: '800' }]}>{label} </Text>
            )}
            <Text style={styles.badgeText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  mainIcon: {
    marginTop: 6, // Alinha com a primeira linha de badges
  },
  badgeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },
  badge: {
    backgroundColor: themeColors[theme].backgroundCard || '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    flexDirection: 'row'
  },
  badgeText: {
    fontSize: 12,
    color: themeColors[theme].textPrimary,
  },
});