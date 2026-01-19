import { themeColors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/context/themeProvider";
import { useMemo } from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";


interface HeaderGlobalProps {
  titlePage: string
  leftIcons?: React.ReactNode[];
  rightIcons?: React.ReactNode[];
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
}


export default function HeaderGlobal({
  titlePage,
  leftIcons,
  rightIcons,
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
          {leftIcons?.map((icon, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}
              onPress={onPressLeftIcon}
              disabled={!onPressLeftIcon}
            >
              {icon}
            </TouchableOpacity>
          ))}
        </View>


        {/* CENTRO */}
        <View style={styles.containerTextHeader}>
          <Text style={styles.textPage}>{titlePage}</Text>
        </View>

        {/* DIREITA */}
        <View style={styles.sideContainer}>
          {rightIcons?.map((icon, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}
              onPress={onPressRightIcon}
              disabled={!onPressRightIcon}
            >
              {icon}
            </TouchableOpacity>
          ))}
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
    flex: 1,
    alignItems: 'center',
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
    width: 80,          // espaço pra até 2 ícones
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },


  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },




});