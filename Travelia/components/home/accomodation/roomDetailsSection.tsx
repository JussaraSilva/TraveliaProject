import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { View, Text, StyleSheet } from 'react-native'


type PropsRoomDetailsSection = {
  typeRoom: string
}




export default function RoomDetailsSection({typeRoom}: PropsRoomDetailsSection) {
  const { styles} = useThemedStyles(createStyles);


  return (
    <View style={styles.container}>
      <View style={styles.containerInfoTop}>
        <Text style={styles.textTitle}>
          {typeRoom}
        </Text>
      </View>
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerInfoTop: {
    marginTop: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },
  
})

