import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { View, Text, StyleSheet } from 'react-native'


type PropsRoomDetailsSection = {
  descriptionRoom: string
}




export default function RoomDetailsSection({descriptionRoom}: PropsRoomDetailsSection) {
  const {theme, styles} = useThemedStyles(createStyles);


  return (
    <View style={styles.container}>
      <View style={styles.containerDescription}>
        <Text style={styles.textTitle}>
          Description
        </Text>

        <Text style={styles.textDescription}>
          {descriptionRoom}
        </Text>
      </View>
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: themeColors[theme].background,
  },
  containerDescription: {},
  textTitle: {},
  textDescription: {},
})

