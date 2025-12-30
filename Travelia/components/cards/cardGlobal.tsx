import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";


import { useMemo } from "react";
import {View, StyleSheet, StyleProp, ViewStyle, Image, Text, TouchableOpacity } from "react-native";


type CardVariant = 'image-text' | 'icon-text-icon';

type CardGlobalProps = {
  variant: CardVariant;
  imagem?: string;
  contentCardStyle?: StyleProp<ViewStyle>;
  containerIconLeftStyle?: StyleProp<ViewStyle>;
  textTitle: string;
  textDescription: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void
};  


export function CardGlobal({ variant, contentCardStyle, textTitle, textDescription, onPress, imagem, leftIcon, rightIcon, containerIconLeftStyle }: CardGlobalProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.containerContent, contentCardStyle]}
        onPress={onPress}
      >

        {/* IMAGE */}
        {variant === 'image-text' && (
          <View style={styles.containerMedia}>
  
            {imagem && (
              <Image
                source={{ uri: imagem }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>
        )}

        {/* LEFT ICON */}
        {variant === 'icon-text-icon' && (
          <View style={[styles.containerIcon, containerIconLeftStyle]}>
            {leftIcon}
          </View>
        )}

        {/* TEXT (sempre existe) */}
        <View style={styles.containerTextPromo}>
          <Text style={styles.textPromoTitle}>{textTitle}</Text>
          <Text style={styles.textPromoDescription}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {textDescription}
          </Text>
        </View>

        {/* RIGHT ICON */}
        {variant === 'icon-text-icon' && (
          <View style={styles.containerIconCaret}>
            {rightIcon}
          </View>
        )}

      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 15,
    },

    containerContent: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
    },

    containerMedia: {
      width: '100%',
      height: 200,
    },

    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },

    containerTextPromo: {
      width: 300,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal : 10,
      paddingBottom: 10,
      gap: 5,
    },

    textPromo: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textPromoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textPromoDescription: {
      fontSize: 16,
      color: themeColors[theme].textPrimary,
    },

    containerIcon: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: themeColors[theme].colorOrange,
      borderRadius: 50,
    },

    containerIconCaret: {
      alignItems: 'center',
      
    },

  });