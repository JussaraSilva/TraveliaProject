
import { useMemo} from "react";
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, ScrollView } from "react-native";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName } from "@/constants/theme";

type ButtonFilterProps = {
  labels: string[];
  activeIndex: number;
  onPress: (index: number) => void;
  backgroundAtivoStyle?: StyleProp<ViewStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
};


export default function ButtonFilter({
  labels,
  activeIndex,
  onPress,
  backgroundAtivoStyle,
  activeTextStyle,
}: ButtonFilterProps) {

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {labels.map((label, index) => {
      const isActive = index === activeIndex;

      return (
        <TouchableOpacity
          key={label}
          onPress={() => onPress(index)}
          style={styles.optionsFilter}
        >
          <View
            style={[
              styles.filtersLine,
              isActive && backgroundAtivoStyle,
            ]}
          >
            <Text
              style={[
                styles.labelButton,
                isActive && activeTextStyle,
              ]}
            >
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({

  scrollContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },


  optionsFilter: {    
    height: 50,
    marginHorizontal: 5,

  },

  filtersLine: {
    alignItems:"center",
    borderRadius: 20,
    justifyContent:"center",
    backgroundColor: themeColors[theme].background,
    paddingHorizontal: 20,
    height: 40,
    flexDirection:"row",
    borderWidth: 2,
    borderColor: themeColors[theme].borderColor,
    alignSelf:"center",
    
  },

  labelButton: {
    color: themeColors[theme].textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    
    
  },

  pressButton: {
    backgroundColor: themeColors[theme].realceBlue,
  },

});