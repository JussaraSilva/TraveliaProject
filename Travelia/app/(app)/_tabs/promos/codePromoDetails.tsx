import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useRouter } from "expo-router";
import {  QuestionIcon, XIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native"

export default function CodePromoDetails() {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
      <View style={styles.containerHeader}>
          <TouchableOpacity style={styles.iconContainer} 
            onPress={() => {router.back()}}
          >
          <XIcon 
            size={30} 
            color={themeColors[theme].icon} 
            weight="light" 
          />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} 
            onPress={() => {}}
          >
          <QuestionIcon 
            size={30} 
            color={themeColors[theme].icon} 
            weight="light" 
          />
          </TouchableOpacity>

      </View>

      <View style={styles.containerMiddle}>
          <View style={styles.containerContent}>
            <View style={styles.containerImage}>
              <Image 
                source={{ uri:'https://cdni.iconscout.com/illustration/premium/thumb/online-shopping-and-discount-offer-illustration-svg-download-png-2252771.png'}}
                style={styles.image}
              />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.text}>
                Have a Promo Code?
              </Text>
            </View>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="ENTER CODE"
                    enterKeyHint="previous"
                    placeholderTextColor={themeColors[theme].textSecondary}
                    autoCapitalize="characters"
                    autoCorrect={false}

                    
                />
            </View>
          </View>
      </View>

      <View style={styles.containerFooter}>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}
            onPress={() => {}}
          >
            <Text style={styles.textButton}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: themeColors[theme].backgroundCard,
      marginTop: 40,
      paddingHorizontal: 10,
      paddingBottom: 20,
      flex: 1,
    },

    containerHeader: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    iconContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    containerMiddle: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      
    },

    containerContent: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      
    },

    containerImage: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },

    containerText: {
      width: '100%',
      height: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      
    },

    text: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerInput: {
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,

    },

    input: {
      width: "100%",
      height: 80,
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',        // horizontal
      textAlignVertical: 'center',// vertical (Android)
      fontSize: 28,
      paddingHorizontal: 20,
      backgroundColor: themeColors[theme].background,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: themeColors[theme].borderColor,
    },

    containerFooter: {
      width: '100%',
      height: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      
    },

    containerButton: {
      width: '100%',
      height: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      
    },

    button: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: themeColors[theme].realceBlue,
    },

    textButton: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },



});

