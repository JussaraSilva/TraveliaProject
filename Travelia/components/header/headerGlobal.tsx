import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Logo } from "../others/logo";


interface HeaderGlobalProps {
  titlePage: string;
  showLogo?: boolean
  containerReverse?: StyleProp<ViewStyle>
  iconHeader?: React.ReactNode
  onPressIcon?: () => void
}

export default function HeaderGlobal({titlePage, showLogo, containerReverse, iconHeader, onPressIcon}: HeaderGlobalProps) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (

      <View style={styles.header}>
        <View style={[styles.containerContentHeader, containerReverse]}>
          <View style={styles.logoContainer}>
              {showLogo && (
                <Logo size={40}
                    style={styles.logo} 
                    showText={false}
                />
              )}
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textPage}>{titlePage}</Text>
          </View>
          <View style={styles.containerHeaderIcons}>              
            <TouchableOpacity style={styles.iconsContainer}
              onPress={onPressIcon}
            >
              {iconHeader}
            </TouchableOpacity>
          </View>  
        </View>
      </View>

  );
}



const createStyles = (theme: ThemeName) =>
  StyleSheet.create({

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  
  
  containerContentHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  containerTextHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },


  textPage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  subTextLocation: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  containerHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: "100%",
    gap: 10,
  },

  iconsContainer: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
  },

  textLocation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

});