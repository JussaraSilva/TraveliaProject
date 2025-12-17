import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CaretRightIcon, SealPercentIcon } from "phosphor-react-native";

import { useMemo } from "react";
import {View, StyleSheet, StyleProp, ViewStyle, Image, Text } from "react-native";


type CardVariant = 'image-text' | 'icon-text-icon';

type CardGlobalProps = {
  variant: CardVariant;
  contentDirection?: StyleProp<ViewStyle>;
  textTitle: string;
  textDescription: string;
};  


export function CardGlobal({ variant, contentDirection, textTitle, textDescription }: CardGlobalProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={[styles.containerContent, contentDirection]}>

        {/* IMAGE */}
        {variant === 'image-text' && (
          <View style={styles.containerMedia}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
              }}
              style={styles.image}
            />
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

      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors[theme].backgroundCard,
      paddingHorizontal: 10,
      borderRadius: 15,
    },

    containerContent: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 15,
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