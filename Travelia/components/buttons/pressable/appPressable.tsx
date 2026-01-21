import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function AppPressable({
  children,
  onPress,
  disabled = false,
  style,
}: Props) {
  const {theme, styles} = useThemedStyles(createStyles);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: disabled
            ? themeColors[theme].borderColor
            : pressed
            ? themeColors[theme].background
            : 'transparent',
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
})

