import { Text, StyleSheet, View, StyleProp, TextStyle, TextInput } from "react-native";

import { themeColors, ThemeName } from "../../constants/theme";
import React, { useMemo } from "react";
import { useTheme } from "@/context/themeProvider";



interface InputLoginProps {
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
  labelStyle?: StyleProp<TextStyle>;
  icon: React.ReactNode;
}


export function InputLogin ({label, placeholder, secureTextEntry, labelStyle, icon}: InputLoginProps) {
  
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
            secureTextEntry={secureTextEntry}
            
            
        />
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
    width: '100%',
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },

  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },


});
  
  


