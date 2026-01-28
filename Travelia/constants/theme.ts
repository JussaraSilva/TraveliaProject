/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const themeColors = {
  light: {
    colorTextButton: '#fff',
    textPrimary: '#212121',
    textSecondary: '#666666',
    background: '#f5f5f5',
    tabIconInative: '#687076',
    tabIconActive: '#237fff',
    tint: tintColorLight,
    backgroundCard: '#fff',
    icon: '#212121',
    colorRealceIcon:'#237fff',
    textColorButtonRealce: '#237fff',
    borderColor:"#DEDEDE",
    backButton:"#237fff",
    textButton: '#fff',
    realceBlue:"#237fff",
    realceLightBlue:'#edf5ff',
    colorInativeIcon:'#b6b6b6',
    backIcon:"#e2e4e2",
    recomendedIconBack: '#ff981f',
    colorOrange:'#ff961f',
    colorRed:'#f54336',
    colorGreen:'#4aaf57',
    starYellowColor:'#ff981f',
    transparentColor: '#73a4bf',
    shadowColor: '#0f0f0fdf',
    selectedColor: '#237fff',
    availableColor: '#e8f2ff',
    occupiedColor: '#2F80ED',
    unavailableColor: '#8495b3',
    
    
  },
  dark: {
    colorTextButton: '#000',
    textPrimary: '#ffff',
    textSecondary: '#dadadb',
    background: '#181a20',
    tabIconInative: '#687076',
    tabIconActive: '#237fff',
    tint: tintColorDark,
    backgroundCard: '#1e2129',
    icon: '#ababae',
    colorRealceIcon:'#237fff',
    textColorButtonRealce: '#fff',
    borderColor:"#303030",
    backButton:"#237fff",
    textButton: '#fff',
    realceBlue:"#237fff",
    realceLightBlue:'#35383f',
    colorInativeIcon:'#b6b6b6',
    backIcon:"#181a20",
    recomendedIconBack: '#ff981f',
    colorOrange:'#ff961f',
    colorRed:'#f54336',
    colorGreen:'#4aaf57',
    starYellowColor:'#ff981f',
    transparentColor: '#76acc7',
    shadowColor: '#d4d4d4cc',
    selectedColor: '#237fff',
    availableColor: '#e8f2ff',
    occupiedColor: '#2F80ED',
    unavailableColor: '#8A94A6',
  },
} as const;


export type ThemeName = keyof typeof themeColors;


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
