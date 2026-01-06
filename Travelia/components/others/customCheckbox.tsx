import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CheckSquareIcon, SquareIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface CustomCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}


const CustomCheckbox = ({label, checked, onChange} : CustomCheckboxProps) => {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.checkboxContainer}
      onPress={() => onChange(!checked)}
    >
      <View style={styles.checkbox}>
        {checked ? (
          <SquareIcon 
            size={30} 
            color={themeColors[theme].icon}  
            weight='light' />
        ) : (
          <CheckSquareIcon 
            size={30} 
            color={themeColors[theme].icon} 
            weight='light' />
        )}
      </View>
      {label && <Text style={styles.textCheckbox}>{label}</Text>}
    </TouchableOpacity>
  );
};



const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckbox: {
    marginLeft: 5,
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },
})

export default CustomCheckbox;