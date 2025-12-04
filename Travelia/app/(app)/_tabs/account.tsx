import ThemeToggleButton from '@/components/buttons/themeToggleButton'
import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Account() {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    
    <View style={styles.container}>
        <ThemeToggleButton />
    </View>
  )
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
    flex: 1,
    backgroundColor: themeColors[theme].background,
  },
  
});