/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { themeColors } from '@/constants/theme';
import {  useTheme } from '@/context/themeProvider';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof themeColors.light & keyof typeof themeColors.dark
) {
  const { theme } = useTheme(); // Pega o tema do contexto global

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themeColors[theme][colorName];
  }
}
