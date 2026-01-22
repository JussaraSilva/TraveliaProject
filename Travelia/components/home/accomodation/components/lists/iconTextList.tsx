import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { themeColors, ThemeName } from '@/constants/theme';



type Props = {
  items: IconTextItem[];
};

export type IconTextItem = {
  id: string;
  label: string;
  Icon: React.ElementType;
};


export function IconTextList({ items }: Props) {
  const { theme, styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.id} style={styles.item}>
          <View style={styles.icon}>
            <item.Icon
              size={22}
              color={themeColors[theme].realceBlue}
              weight="light"
            />
          </View>

          <Text
            style={styles.text}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '45%',
  },

  icon: {
    backgroundColor: themeColors[theme].realceLightBlue,
    borderRadius: 50,
    padding: 10,
  },

  text: {
    flex: 1,
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },



})
