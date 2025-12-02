import { PaperPlaneTiltIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";



export function Logo() {

  return(
    <View style={styles.icon}>
          <PaperPlaneTiltIcon 
            size={100} 
            color="black" 
          />
          <Text style={styles.textLogo}>Travelia</Text>
    </View>
  )
  
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});