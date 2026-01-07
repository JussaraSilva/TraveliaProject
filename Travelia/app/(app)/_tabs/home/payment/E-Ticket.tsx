import { PacoteViagem } from "@/assets/types/bookingType";
import { themeColors, ThemeName } from "@/constants/theme"
import { useTheme } from "@/context/themeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon } from 'phosphor-react-native';
import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"


export default function ETicket(){

  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const params = useLocalSearchParams<{
      pacote?: string;
      paymentId?: string;
      paymentTitle?: string;
      paymentSubtitle?: string;
      discountId?: string;
      discountTitle?: string;
      discountSubtitle?: string;
    }>();


  const pacoteObj: PacoteViagem | null = params.pacote
      ? JSON.parse(
          Array.isArray(params.pacote) ? params.pacote[0] : params.pacote
        )
      : null;

  const backHome = () => {
    router.push('/(app)/_tabs/home');
  }

  const viewBooking = () => {
      router.push({
        pathname: '/(app)/_tabs/myTrips',
        params: {
          pacote: JSON.stringify(pacoteObj),
        },
      });
  }

  return(
    <View style={styles.container}>
      <View style={styles.containerMiddle}>
        <View style={styles.containerIconStatus}>
          <CheckCircleIcon 
          size={70}
          weight="bold"
          color={themeColors[theme].realceBlue} />
        </View>
        <View style={styles.containerTextStatus}>
          <Text style={styles.textStatus}>Booking Confirmed!</Text>
        </View>
        <View style={styles.containerSubTextStatus}>
          <Text style={styles.subTextStatus}>Get ready for on unforgettable journey - your travel details have been sent to your email.</Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonHome}
            onPress={backHome}
          >
            <Text style={styles.textButtonBackHome}>
              Back to Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonViewBooking}
            onPress={viewBooking}

          >
            <Text style={styles.textButtonViewBooking}>
              View My Booking
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )

}


const createStyles = (theme: ThemeName) => StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].backgroundCard,
  },


  containerMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap : 10,
    paddingHorizontal: 30,
  },

  containerIconStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerTextStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerSubTextStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  subTextStatus: {
    fontSize: 18,
    color: themeColors[theme].textPrimary,
  },

  containerFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical : 20,
  },

  buttonHome: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].realceLightBlue,
    borderRadius: 30,
    padding: 20,
  },

  textButtonViewBooking: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textButton,
  },

  textButtonBackHome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].realceBlue,
  },

  buttonViewBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors[theme].realceBlue,
    borderRadius: 30,
    padding : 20,
  },


})