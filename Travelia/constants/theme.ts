/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const themeColors = {
  light: {
    textPrimary: '#212121',
    textSecondary: '#666666',
    background: '#f5f5f5',
    tabIconInative: '#687076',
    tabIconActive: '#237fff',
    tint: tintColorLight,
    backgroundCard: '#fff',
    colorRealceIcon:'#237fff',
    borderColor:"#DEDEDE",
    backButton:"#237fff",
    textButton: '#fff',
    realceBlue:"#237fff",
    realceLightBlue:'#edf5ff',
    colorInativeIcon:'#b6b6b6',
    backIcon:"#e2e4e2",
    recomendedIconBack: '#ff981f',
    colorRed:'#f54336',
    colorGreen:'#4aaf57',
    starYellowColor:'#ff981f',
    
    
  },
  dark: {
    textPrimary: '#ffff',
    textSecondary: '#dadadb',
    background: '#181a20',
    tabIconInative: '#687076',
    tabIconActive: '#237fff',
    tint: tintColorDark,
    backgroundCard: '#1f222a',
    colorRealceIcon:'#237fff',
    borderColor:"#242424",
    backButton:"#237fff",
    textButton: '#fff',
    realceBlue:"#237fff",
    realceLightBlue:'#35383f',
    colorInativeIcon:'#b6b6b6',
    backIcon:"#181a20",
    recomendedIconBack: '#ff981f',
    colorRed:'#f54336',
    colorGreen:'#4aaf57',
    starYellowColor:'#ff981f',
  },
}

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
