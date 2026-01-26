import HeaderGlobal from '@/components/header/headerGlobal'
import { themeColors, ThemeName } from '@/constants/theme'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import { CaretLeftIcon } from 'phosphor-react-native'
import { View, StyleSheet } from 'react-native'



export default function AccomodationPolicies() {
  const { theme,styles } = useThemedStyles(createStyles)


  return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <HeaderGlobal 
              leftIcons={[
                <CaretLeftIcon 
                  key="options" 
                  size={24} 
                  color={themeColors[theme].icon} 
                />]}
              titlePage={'Policies'} 
            />
        </View>
        
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
  },

  containerHeader: {
  
  },
})