import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from "react-native";

import { themeColors, ThemeName } from "../../constants/theme";
import React, { useMemo } from "react";
import { useTheme } from "@/context/themeProvider";


interface LoginOptionProps {
  title?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // Estilo do texto
}


export function LoginOption ({title,onPress, icon, style, textStyle}: LoginOptionProps) {
  
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
      
    </TouchableOpacity>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    backgroundColor: themeColors[theme].backgroundCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    
  },

  iconContainer: {
    flex:1,
    marginRight: 10,
    justifyContent: 'center',
  },

  textContainer: {
    flex: 3,
    
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },
});
  
  


