import { Logo } from "@/components/others/logo"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { useMemo } from "react";

import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from '../../context/themeProvider'; // 
import {  ArrowLeftIcon, EnvelopeSimpleIcon, LockSimpleIcon} from "phosphor-react-native";
import { InputLogin } from "@/components/inputs/inputLogin";

export default function Login() {

  const { theme } = useTheme();
  
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contentHeader}>
            <TouchableOpacity style={styles.buttonBack}>
              <ArrowLeftIcon 
                size={30}
                color="black"
                weight="light" 
              />
            </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Logo 
              size={50}
              style={styles.logo}
              textStyle={styles.textLogo} 
            />
          </View>
        </View>
      </View>
      <View style={styles.containerTextTop}>
          <Text style={styles.textTop}>
              Your Travel Awaits
          </Text>
          <Text style={styles.textSubTop}>
              Start Your journey in just a minute.
          </Text>
      </View>

      <View style={styles.containerInputs}>
          <InputLogin 
              icon={<EnvelopeSimpleIcon 
                size={30} 
                color="black" 
                weight="fill" 
              />}
              label="Email" 
              placeholder="Enter your email" 
              secureTextEntry={false} 
              
              
          />
          <InputLogin 
              icon={<LockSimpleIcon 
                size={30} 
                color="black" 
                weight="fill" 
              />}
              label="Password" 
              placeholder="Password" 
              secureTextEntry={false} 
              
              
          />

        </View>
    </View>
  )
}


const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    paddingHorizontal : 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 40,
    width: '100%',
    
  },

  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    flex: 1,
    
  },

  buttonBack: {
    width: "10%",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: "90%",
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  textLogo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  containerTextTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  textTop: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  textSubTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  containerInputs: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  labelInputs: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },




})