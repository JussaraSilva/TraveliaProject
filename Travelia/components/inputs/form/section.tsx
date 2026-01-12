// Section.tsx
import { themeColors, ThemeName } from '@/constants/theme'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import React from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'

type SectionProps = {
  title: string
  style?: ViewStyle
  styleText?: TextStyle
  children: React.ReactNode
}

export function Section({ title, style, styleText, children }: SectionProps) {

  const {styles} = useThemedStyles(createStyles);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, styleText]}>{title}</Text>
      <View style={styles.border}>
        {children}
      </View>
    </View>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
      position: 'relative',
      paddingTop: 10, // espaço pro title flutuar
    },
    title: {
      position: 'absolute',
      top: -10,
      left: 12,
      backgroundColor: themeColors[theme].backgroundCard, // ou cor do fundo do container
      paddingHorizontal: 4,
      fontSize: 13,
      color: '#999',
      fontWeight: '500',
    },
    border: {
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 6,
      padding: 12, // espaçamento interno
      minHeight: 60, // altura mínima se quiser, mas cresce com o conteúdo
    },
  });

