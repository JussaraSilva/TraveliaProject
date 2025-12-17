import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { DotsThreeVerticalIcon } from "phosphor-react-native";
import { useMemo } from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Logo } from "../others/logo";


export default function HeaderGlobal() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (

      <View style={styles.header}>
        <View style={styles.containerContentHeader}>
          <View style={styles.logoContainer}>
              <Logo size={40}
                    style={styles.logo} 
                    showText={false}
                    />
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textPage}>Promos</Text>
          </View>
          <View style={styles.containerHeaderIcons}>              
            <TouchableOpacity style={styles.iconsContainer}>
              <DotsThreeVerticalIcon
                size={30}
                color={themeColors[theme].icon}
                weight="bold"
              />
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