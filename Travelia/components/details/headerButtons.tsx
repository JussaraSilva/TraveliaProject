import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from "@/context/themeProvider";
import { CaretLeftIcon, HeartIcon, ShareNetworkIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native"





export default function HeaderButtons (){
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity>
        <CaretLeftIcon 
        size={30} 
        color={themeColors[theme].icon} 
        weight="light" 
        />
      </TouchableOpacity>
      <View style={styles.iconsHeader}>
        <HeartIcon 
          size={30} 
          color={themeColors[theme].icon} 
          weight="light" 
        />
        <ShareNetworkIcon 
          size={30} 
          color={themeColors[theme].icon} 
          weight="light" 
        />
      </View>
    </View>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 10,
    },

    iconsHeader: {
      flexDirection: 'row',
      gap: 10,
    },


  })