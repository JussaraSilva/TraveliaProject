import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { themeColors } from "../../constants/theme";
import { useThemeColor } from "../../hooks/use-theme-color";


interface ThemedButtonProps {
  title: string;
  onPress: () => void;
}


export function ThemedButton ({title,onPress}: ThemedButtonProps) {
  const buttonBackground = useThemeColor({ light: themeColors.light.backButton, dark: themeColors.dark.backButton }, 'backButton');
  
  const buttonTextColor = useThemeColor({ light: themeColors.light.textButton, dark: themeColors.dark.textButton }, 'textButton');
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBackground }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: buttonTextColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
  
  


