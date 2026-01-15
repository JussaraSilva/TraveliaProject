import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type TravelerSelectProps = {
  label?: string;
  labelRight?: string;
  value?: string;
  valueSeats?: string;
  onPress?: () => void;
}


export default function FlightSeatSelect({labelRight, label, value, valueSeats, onPress}: TravelerSelectProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);



  return (
    <TouchableOpacity style={styles.containerTraveler}
      onPress={onPress}
    >
      <View style={styles.containerLabel}>
        <Text style={styles.valueLabel}>
          {[label]}
        </Text>
      </View>
      <View style={styles.valueArea}>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value ?? 'Select Traveler'}</Text>
        </View>
        
        <View style={styles.valueSeat}>
          <View style={styles.containerLabelRight}>
              <Text style={styles.valueLabelRight}>
                {labelRight}
              </Text>
          </View>
            <Text style={styles.valueSeatText}>{valueSeats ?? 'Seat'}</Text>
        </View>
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
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: themeColors[theme].icon,
    marginBottom: 10,
    marginTop: 10,
    position: 'relative',
  },

  containerLabel: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 5,
    marginRight: 10,
    zIndex: 1,
  },

  valueLabel: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  valueArea: {
    flex: 1, // Ocupa o espaço todo do container pai
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  valueContainer: {
    flex: 1, // Importante: empurra o ícone para a direita
  },

  valueText: {
    fontSize: 16,
    color: themeColors[theme].textPrimary, // Mudei para Primary para destacar
    fontWeight: '600',
  },

  valueSeat: {
    width: 80, // Importante: empurra o ícone para a direita
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: themeColors[theme].icon,
  },

  valueSeatText: {
    fontSize: 16,
    color: themeColors[theme].textPrimary, // Mudei para Primary para destacar
    fontWeight: '600',
  },

  containerLabelRight: {
    position: 'absolute',
    top: -20,
    right: 10,
    backgroundColor: themeColors[theme].backgroundCard,
    paddingHorizontal: 5,
    marginRight: 10,
    zIndex: 1,
  },

  valueLabelRight: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },


});