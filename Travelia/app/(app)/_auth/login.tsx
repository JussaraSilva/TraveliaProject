import { Logo } from "@/components/others/logo"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { useMemo, useState } from "react";

import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from '../../../context/themeProvider'; // 
import {  AppleLogoIcon, ArrowLeftIcon,  EnvelopeSimpleIcon, EyeClosedIcon, FacebookLogoIcon, GoogleLogoIcon, LockSimpleIcon, XLogoIcon} from 'phosphor-react-native';
import { InputLogin } from "@/components/inputs/inputLogin";
import CustomCheckbox from "@/components/others/customCheckbox";
import { LoginOption } from "@/components/buttons/loginOption";
import { useRouter } from "expo-router";


export default function Login() {

  const { theme } = useTheme();
  
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [checked, setChecked] = useState(true);

  const handleHome = () => {
    router.replace('/(app)/_tabs/home');
  }

  const router = useRouter();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style={styles.buttonBack}
              onPress={() => router.back()}
            >
              <ArrowLeftIcon 
                size={30}
                color={themeColors[theme].icon}
                weight="light" 
              />
            </TouchableOpacity>
        <View style={styles.contentHeader}>
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
              Welcome Back
          </Text>
          <Text style={styles.textSubTop}>
              Lets pick up where you left off.
          </Text>
      </View>

      <View style={styles.containerInputs}>
          <InputLogin 
              icon={<EnvelopeSimpleIcon 
                size={30} 
                color= {themeColors[theme].icon} 
                weight="light" 
              />}
              label="Email" 
              placeholder="Enter your email" 
              secureTextEntry={false} 
              
              
          />
          <InputLogin 
              icon={<LockSimpleIcon 
                size={30} 
                color={themeColors[theme].icon}  
                weight="light" 
              />}
              label="Password" 
              placeholder="Password" 
              secureTextEntry={false} 
              iconPassword={
                <EyeClosedIcon
                  size={30} 
                  color={themeColors[theme].icon} 
                  weight="light" 
                />
              }
          />

      </View>
      
      <View style={styles.checkboxContainer}>
          <CustomCheckbox 
            label="Remember me" 
            checked={checked} 
            onChange={setChecked}
          />

          <TouchableOpacity>
            <Text style={styles.textForgot}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.textSignUp}>Don&apos;t have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.linkSignUp}>Sign Up</Text>
        </TouchableOpacity>
          
      </View>

      <View style={styles.continueContainer}>
        <View style={styles.separator}></View>
        <Text style={styles.textContinue}>or continue with</Text>
        <View style={styles.separator}></View>
      </View>

      <View style={styles.containerButtonsLogin}>
        <LoginOption 
          style={styles.buttonLogo}  
          onPress={() => {}}
          icon={<GoogleLogoIcon 
            size={30}
            color="#f44b3c" 
            weight="bold"
          />}
        />
        <LoginOption 
          style={styles.buttonLogo}  
          onPress={() => {}}
          icon={
          <AppleLogoIcon 
            size={30} 
            color="#a7adb0" 
            weight="fill" 
          />}
        />

        <LoginOption 
          style={styles.buttonLogo}  
          onPress={() => {}}
          icon={
            <FacebookLogoIcon 
              size={30} 
              color="#0862f6" 
              weight="fill" 
            />}
        />

        
        <LoginOption 
          style={styles.buttonLogo}  
          onPress={() => {}}
          icon={
            <XLogoIcon 
              size={30} 
              color="#000000" 
              weight="fill" 
          />}
        />
      </View>

      <View style={styles.containerFooter}>
        <LoginOption 
          style={styles.buttonLogin}  
          onPress={handleHome}
          title="Sign In"
          textStyle={styles.textLogin}
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
    marginTop: 30,
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  textCheckbox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,

  },

  textForgot: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].realceBlue,
  },

  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 5
  },

  textSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  linkSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].realceBlue,
  },

  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 10
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: themeColors[theme].borderColor,
  },

  textContinue: {
    fontSize: 16,
    fontWeight: 'light',
    color: themeColors[theme].textPrimary,
  },

  containerButtonsLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  buttonLogo: {
    width: "20%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  containerFooter: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderTopColor: themeColors[theme].borderColor,
    borderTopWidth: 1,
  },

  textFooter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors[theme].realceBlue,
  },

  buttonLogin: {
    paddingHorizontal: 75,
    backgroundColor: themeColors[theme].realceBlue,
    height: 50,
    marginTop: 30,
    flex:1,
    borderRadius: 20,
  },

  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
  },









  



  






})