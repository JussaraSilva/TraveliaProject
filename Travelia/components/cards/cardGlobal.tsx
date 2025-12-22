import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CaretRightIcon, SealPercentIcon } from "phosphor-react-native";

import { useMemo } from "react";
import {View, StyleSheet, StyleProp, ViewStyle, Image, Text, TouchableOpacity } from "react-native";


type CardVariant = 'image-text' | 'icon-text-icon';

type CardGlobalProps = {
  variant: CardVariant;
  imagem?: string;
  contentCardStyle?: StyleProp<ViewStyle>;
  textTitle: string;
  textDescription: string;
  onPress?: () => void
};  


export function CardGlobal({ variant, contentCardStyle, textTitle, textDescription, onPress, imagem }: CardGlobalProps) {
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
          <View style={styles.containerIcon}>
            <SealPercentIcon
              size={30}
              color={themeColors[theme].textButton}
              weight="fill"
            />
          </View>
        )}

        {/* TEXT (sempre existe) */}
        <View style={styles.containerTextPromo}>
          <Text style={styles.textPromoTitle}>{textTitle}</Text>
          <Text style={styles.textPromoDescription}>
            {textDescription}
          </Text>
        </View>

        {/* RIGHT ICON */}
        {variant === 'icon-text-icon' && (
          <View style={styles.containerIconCaret}>
            <CaretRightIcon
              size={40}
              color={themeColors[theme].icon}
              weight="light"
            />
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