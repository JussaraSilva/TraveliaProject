import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { CaretDownIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type TravelerSelectProps = {
  label?: string;
  value?: string;
  onPress?: () => void;
}


export default function TravelerSelect({label, value, onPress}: TravelerSelectProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);



  return (
    <TouchableOpacity style={styles.containerTraveler}
      onPress={onPress}
    >
      <View style={styles.containerLabel}>
        <Text style={styles.valueLabel}>
          {label}
        </Text>
      </View>
      <View style={styles.valueArea}>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value ?? 'Select Traveler'}</Text>
        </View>
        
        <CaretDownIcon 
          size={20} 
          color={themeColors[theme].icon} 
          weight="light" 
        />
      </View>

      
    </TouchableOpacity>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    width: '100%',
  },

  containerTraveler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors[theme].backgroundCard,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
    marginBottom: 10,
  },

  containerLabel: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 5,
    marginRight: 10,
  },

  valueLabel: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  valueArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10,
  },

  valueContainer: {
    maxWidth: 200,
  },

  valueText: {
    fontSize: 18,
    color: themeColors[theme].textSecondary,
    fontWeight: 'bold',
  },


});