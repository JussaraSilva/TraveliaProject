import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";


interface HeaderGlobalProps {
  titlePage: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
}


export default function HeaderGlobal({
  titlePage,
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon
}: HeaderGlobalProps) {

  const { theme } = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.header}>
      <View style={styles.containerContentHeader}>

        {/* ESQUERDA */}
        <View style={styles.sideContainer}>
          {leftIcon && (
            <TouchableOpacity onPress={onPressLeftIcon}>
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* CENTRO */}
        <View style={styles.containerTextHeader}>
          <Text style={styles.textPage}>{titlePage}</Text>
        </View>

        {/* DIREITA */}
        <View style={styles.sideContainer}>
          {rightIcon && (
            <TouchableOpacity onPress={onPressRightIcon}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

      </View>
    </View>
  )
}




const createStyles = (theme: ThemeName) =>
  StyleSheet.create({

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  
  
  containerContentHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  containerTextHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },

  textPage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },
  
  
  sideContainer: {
    width: 40, // reserva espaço fixo
    alignItems: 'center',
    justifyContent: 'center',
  },




});