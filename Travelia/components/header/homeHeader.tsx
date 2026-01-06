import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { BellIcon, HeartIcon, MagnifyingGlassIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { Image, View, Text, StyleSheet } from "react-native";


export default function HomeHeader() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (

      <View style={styles.header}>
        <View style={styles.containerContentHeader}>
          <View style={styles.profilePictureContainer}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'}} 
              style={styles.profilePicture} />
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textLocation}>New york, USA</Text>
            <Text style={styles.subTextLocation}>Your Location</Text>
          </View>
          <View style={styles.containerHeaderIcons}>
            <View style={styles.iconsBack}>
              <MagnifyingGlassIcon 
                size={30}
                color={themeColors[theme].icon}
                weight="light"
              />
            </View>
            <View style={styles.iconsBack}>
              <HeartIcon 
                size={30}
                color={themeColors[theme].icon}
                weight="light"
              />
            </View>
            <View style={styles.iconsBack}>
              <BellIcon 
                size={30}
                color={themeColors[theme].icon}
                weight="light"
              />
            </View>
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

  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  containerTextHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },


  text: {
    fontSize: 20,
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

  iconsBack: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors[theme].borderColor,
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