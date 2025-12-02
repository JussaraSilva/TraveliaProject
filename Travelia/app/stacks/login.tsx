import { Logo } from "@/components/others/logo"
import { PaperPlaneTiltIcon } from "phosphor-react-native"
import { View, Text, StyleSheet } from "react-native"


export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
            <Logo />
        </View>
        
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },


})