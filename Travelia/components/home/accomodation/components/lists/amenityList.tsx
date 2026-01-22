import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { View, Text, StyleSheet } from 'react-native';


type Props = {
  items: { id: string; label: string; Icon?: any }[];
  variant?: 'inline' | 'list';
};


export function AmenityList({ items, variant = 'inline' }: Props) {
  const { theme, styles } = useThemedStyles(createStyles);

  return (
    <View
      style={[
        styles.container,
        variant === 'list' && styles.listContainer,
      ]}
    >
      {items.map(item => (
        <View
          key={item.id}
          style={[
            styles.item,
            variant === 'list' && styles.listItem,
          ]}
        >
          {item.Icon && (
            <View style={styles.icon}>
              <item.Icon
                size={20}
                color={themeColors[theme].realceBlue}
                weight="light"
              />
            </View>
          )}

          <Text style={styles.text}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },

    listContainer: {
      flexDirection: 'column',
      gap: 8,
    },

    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    listItem: {
      width: '100%',
    },

    icon: {
      width: 24,
      alignItems: 'center',
    },

    text: {
      flexShrink: 1,
    },
  });

