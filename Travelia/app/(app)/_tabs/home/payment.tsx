import { StyleSheet, View} from "react-native";
import { useMemo } from "react";
import { CaretLeftIcon } from "phosphor-react-native";
import HeaderGlobal from "@/components/header/headerGlobal";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName } from "@/constants/theme";
import BookingStepsLine from "@/components/buttons/bookingStepsLine";




export default function Payment() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderGlobal 
          titlePage="Payment Details"
          leftIcon={<CaretLeftIcon size={24} color={themeColors[theme].icon} />}
          onPressRightIcon={() => {}}
        />

        <View style={styles.containerSteps}>
            <BookingStepsLine />
        </View>

            
        </View>
      </View>
  )
}

const createStyles = (theme: ThemeName) => (
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors[theme].background,
    },

    containerHeader: {
      flexDirection: 'column',
      backgroundColor: themeColors[theme].backgroundCard,

    },

    containerSteps: {
      marginTop: 10,
      marginBottom: 20,
    },






  })
);