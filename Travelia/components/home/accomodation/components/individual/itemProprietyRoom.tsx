import { themeColors, ThemeName } from '@/constants/theme'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import { AngleIcon, BedIcon, UsersIcon } from 'phosphor-react-native'
import { View, Text, StyleSheet } from 'react-native'



type PropsRoomDetailsSection = {
  typeBed: string,
  capacidadePersons: string,
  sizeRoom: number

}


export default function ItemProprietyRoom({ typeBed, capacidadePersons, sizeRoom }: PropsRoomDetailsSection) {

  const { theme, styles } = useThemedStyles(createStyles);

  return(
          <View style={styles.containerDetailsRoom}>

            <View style={styles.containerItem}>
              <View style={styles.containerIconItem}>
                  <BedIcon size={30} color={themeColors[theme].realceBlue} weight="bold" />
              </View>
              <Text style={styles.textLabelItem}>
                Bed Type
              </Text>
              <Text style={styles.textItem}>
                {typeBed}
              </Text>
            </View>

            <View style={styles.containerItem}>
              <View style={styles.containerIconItem}>
                  <UsersIcon size={30} color={themeColors[theme].realceBlue} weight="bold" />
              </View>
              <Text style={styles.textLabelItem}>
                Guest(s)
              </Text>
              <Text style={styles.textItem}>
                {capacidadePersons}
              </Text>
            </View>

            <View style={styles.containerItem}>
              <View style={styles.containerIconItem}>
                  <AngleIcon size={30} color={themeColors[theme].realceBlue} weight="bold" />
              </View>
              <Text style={styles.textLabelItem}>
                Room Size
              </Text>
              <Text style={styles.textItem}>
                {sizeRoom} m²
              </Text>
            </View>

          </View>

)}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  containerDetailsRoom: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    alignItems: 'center',
  },

  containerItem: {
    width: '30%',
    alignItems: 'center',
    gap: 5,
  },

  containerIconItem: {
    backgroundColor: themeColors[theme].realceLightBlue,
    borderRadius: 50,
    padding: 10,
  },

  textLabelItem: {
    fontSize: 12,
    color: themeColors[theme].textSecondary,
  },

  textItem: {
    fontSize: 14,
    textAlign: 'center',
    color: themeColors[theme].textPrimary,
  },


})
