import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from "react-native";

import { themeColors, ThemeName } from "../../constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";


interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>;
}


export function ThemedButton ({title,onPress, style, textStyle}: ThemedButtonProps) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: themeColors[theme].backButton,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].colorTextButton,
  },
});
  
  


