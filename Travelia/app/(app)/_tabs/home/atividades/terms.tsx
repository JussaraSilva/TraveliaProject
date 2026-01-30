
import HeaderGlobal from "@/components/header/headerGlobal";
import { themeColors, ThemeName } from "@/constants/theme";
import { useBooking } from "@/context/booking/bookingContext";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { router } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import { StyleSheet, View, ScrollView, Text } from "react-native";


export default function Terms() {

  const {pacoteOriginal} = useBooking();

  

  const {theme,styles} = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal 
          titlePage="Termos & Condições" 
          onPressLeftIcon={router.back}
          leftIcons={[
            <CaretLeftIcon 
              key="back" 
              size={24} 
              color={themeColors[theme].icon} 
            />]
          }
        />
      </View>

          <ScrollView style={styles.content}>
              <View style={styles.containerTop}>
                  <View style={styles.contentNamePacket}>
                    <Text style={styles.nomePacoteTop}>
                      {pacoteOriginal?.nome_pacote}
                    </Text>
                  </View>
              </View>
                <View style={styles.contentRulers}>
                  
                </View>
          </ScrollView>



    </View>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    
  },

  containerHeader: {
    marginBottom: 20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 10,
  },

  containerTop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  contentNamePacket: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nomePacoteTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  contentRulers: {
    flexDirection: 'column',
    gap: 10,
  },


})