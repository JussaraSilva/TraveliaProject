import { themeColors, ThemeName } from "../../constants/theme";
import { useTheme } from "@/context/themeProvider";
import { PaperPlaneTiltIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";


interface LogoProps {
  size: number; 
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}
export function Logo({size, textStyle, style}: LogoProps) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return(
    <View style={[styles.logo, style]}>
          <PaperPlaneTiltIcon
            size={size} 
            color="black"
            weight="fill" 
          />
          <Text style={[styles.textLogo, textStyle]}>Travelia</Text>
    </View>
  )
  
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    height: 60,
    gap: 5,
  },
  textLogo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },
});