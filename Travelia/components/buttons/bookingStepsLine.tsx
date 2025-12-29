import { StyleSheet, View, Text } from "react-native";
import { useMemo } from "react";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName } from "@/constants/theme";
import { CheckIcon } from "phosphor-react-native";
import { usePathname } from "expo-router";



 
export default function BookingStepsLine() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pathname = usePathname();

  const steps = [
    { label: 'Book', route: '/booking' },
    { label: 'Payment', route: '/payment' },
    { label: 'E-Ticket', route: '/e-ticket' },
  ];

  const currentStepIndex = steps.findIndex(step =>
    pathname.includes(step.route)
  );

  return (
    <View style={styles.containerSteps}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;

        return (
          <View
            key={step.label}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            {/* step */}
            <View style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepCircle,
                  (isActive || isCompleted) && styles.backgroundAtivoStyle,
                ]}
              >
                {isCompleted ? (
                  <CheckIcon
                    size={18}
                    color={themeColors[theme].textButton}
                  />
                ) : (
                  <Text
                      style={[
                        styles.stepTextNumber,
                        isActive && { color: themeColors[theme].textButton }
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
              </View>

              <Text style={styles.stepTextSubtitle}>{step.label}</Text>
            </View>

            {/* separator */}
            {index < steps.length - 1 && (
              <View style={styles.containerSeparator}>
                <View
                  style={[
                    styles.stepSeparatorLine,
                    index < currentStepIndex && styles.backgroundAtivoStyle,
                  ]}
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}



const createStyles = (theme: ThemeName) => (
  StyleSheet.create({
    containerSteps: {
      flexDirection: 'row',
      justifyContent: 'center',
      
      alignItems: 'center',
      width: '100%',
    },

    stepIndicator: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      width: 50,
    },

    stepCircle: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: themeColors[theme].background,
      alignItems: 'center',
      justifyContent: 'center',
    },

    stepTextNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    stepTextSubtitle: {
      marginTop: 5,
      fontSize: 12,
      color: themeColors[theme].textSecondary,
    },

    containerSeparator: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginBottom: 18,
      marginHorizontal: 5,
      
    },

    stepSeparatorLine: {
      width: 50,
      height: 2,
      backgroundColor: themeColors[theme].textSecondary,
    },

    backgroundAtivoStyle: {
      backgroundColor: themeColors[theme].realceBlue,
    },

    
  })
);