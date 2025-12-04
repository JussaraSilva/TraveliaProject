import { Text, StyleSheet, View, StyleProp, TextStyle, TextInput, TouchableOpacity } from "react-native";

import { themeColors, ThemeName } from "../../constants/theme";
import React, { useMemo } from "react";
import { useTheme } from "@/context/themeProvider";



interface InputLoginProps {
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
  labelStyle?: StyleProp<TextStyle>;
  icon: React.ReactNode;
  iconPassword?: React.ReactNode;
}


export function InputLogin ({label, placeholder, secureTextEntry, labelStyle, icon, iconPassword}: InputLoginProps) {
  
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.containerInput}>
        <Text style={[styles.textLabel, labelStyle]}>
            {label}
        </Text>

      <View style={styles.inputContent}>
        {icon}
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={themeColors[theme].textSecondary}
            secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity>
          {iconPassword}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  containerInput: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },

  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: themeColors[theme].textPrimary,
    backgroundColor: themeColors[theme].backgroundCard,
  },

  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    backgroundColor: themeColors[theme].backgroundCard,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },


});
  
  


