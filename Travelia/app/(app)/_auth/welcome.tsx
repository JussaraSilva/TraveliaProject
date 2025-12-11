import { Logo } from "@/components/others/logo"
import { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native"

import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from '../../context/themeProvider'; // 
import { LoginOption } from "@/components/buttons/loginOption";
import { AppleLogoIcon, FacebookLogoIcon, GoogleLogoIcon, HandTapIcon,SignInIcon,  XLogoIcon } from "phosphor-react-native";
import { router } from "expo-router";

export default function Welcome() {

  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleLogin = () => {
    router.navigate('/_auth/login');
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
            <Logo 
              size={70}
              style={styles.logo}
              textStyle={styles.textLogo} 
            
            />
        </View>
        <View style = {styles.textHeaderContainer}>
          <Text style={styles.textCall}>Let´s Get Started!</Text>
          <Text style={styles.textSubCall}>Let´s Dive in your account</Text>
        </View>      
      </View>
      <View style={styles.containerButtonsLogin}>
        <LoginOption 
        title="Continue With Google"  
        icon={
          <GoogleLogoIcon 
            size={30}   
            color="#f44b3c"
            weight="bold" 
          />} 
        onPress={() => {}} 
        />
        <LoginOption 
        title="Continue With Apple"  
        icon={
          <AppleLogoIcon 
            size={30}   
            color="#a7adb0"
            weight="fill" 
          />} 
        onPress={() => {}} 
        />
        <LoginOption 
        title="Continue With Facebook"  
        icon={
          <FacebookLogoIcon 
            size={30}   
            color="#0862f6"
            weight="fill" 
          />} 
        onPress={() => {}} 
        />
        <LoginOption 
        title="Continue With Twitter"  
        icon={
          <XLogoIcon 
            size={30}   
            color="#000000" 
            weight="fill"
          />} 
        onPress={() => {}} 
        />
      </View>
      
      <View style={styles.containerButtonsAction}>
        <LoginOption 
          title="Inscreva-se" 
          textStyle={styles.loginButtonText} 
          onPress={() => {}}
          style={styles.loginButton} 
          icon= {
          <HandTapIcon 
            size={30}   
            color="#fff" 
            weight="light"
          />
        }
        />
        <LoginOption 
        title="Login"  
        textStyle={styles.loginButtonText}
        onPress={handleLogin}
        style={styles.loginButton}
        icon= {
          <SignInIcon 
            size={30}   
            color="#fff" 
            weight="fill"
          />
        }
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
    paddingHorizontal: 24,
    gap: 10,
  },

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  textHeaderContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textCall: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  textSubCall: {
    fontSize: 20,
    color: themeColors[theme].textPrimary,
    
  },

  containerButtonsLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  iconContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  

  containerButtonsAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  loginButton: {
    backgroundColor: themeColors[theme].realceBlue,
  },

  loginButtonText: {
    color: themeColors[theme].textButton,
  },

  logo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    height: 60,
    gap: 5,
  },

  textLogo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  


})