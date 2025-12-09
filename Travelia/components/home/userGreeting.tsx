import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  userName: string;
}


export default function UserGreeting( {userName }: Props) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
        <View style={styles.containerTextUserName}>
            <Text style={styles.textWelcome}>Hello,</Text>
            <Text style={styles.textNameUser}>{userName}!</Text>
        </View>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    containerTextUserName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      },
    
      textWelcome: {
        fontSize: 30,
        fontWeight: 'light',
        color: themeColors[theme].textPrimary,
      },
    
      textNameUser: {
        fontSize: 30,
        fontWeight: 800,
        color: themeColors[theme].textPrimary,
      },
    
  })