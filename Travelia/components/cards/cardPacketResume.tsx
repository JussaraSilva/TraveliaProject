import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { useTheme } from "@/context/themeProvider";
import { themeColors, ThemeName } from "@/constants/theme";
import { DateText } from "@/components/utils/date/formatDate";
import { CaretRightIcon } from 'phosphor-react-native';

type PacoteResumeProps = {
  namePacket: string;
  dataCheckIn: string;
  dataCheckOut: string;
  imagePacket: string;
  onPressResumePacket: () => void;
}


export default function CardPacketResume({ namePacket, dataCheckIn, dataCheckOut, imagePacket, onPressResumePacket }: PacoteResumeProps) {
  const { theme } = useTheme(); 
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
        <TouchableOpacity style={styles.containerInfoPacketCard}
          onPress={onPressResumePacket}
        >
          <View style={styles.containerImagePacket}>
            <Image
              source={{uri: imagePacket}}
              style={styles.imagePacket}
            >
            </Image>
          </View>
          <View style={styles.containerInfoTextPacket}>
            <View style={styles.containerNamePacket}>
              <Text style={styles.textNamePacket}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {namePacket}
              </Text>
            </View>

            <View style={styles.containerDataTripPacket}>
              <View style={styles.containerTextCheckIn}>
                <Text style={styles.textDataTripPacket}>
                  <DateText value={dataCheckIn}
                    variant="short"
                  />
                </Text> 
              </View>
              <Text style={styles.textDataSeparator}>-</Text>
              <View style={styles.containerTextCheckOut}>
                <Text style={styles.textDataTripPacket}>  
                  <DateText value={dataCheckOut}
                    variant="short"
                  />
                </Text>
              </View>
            </View>

          </View>
          <View style={styles.containerIconMore}>
            <CaretRightIcon size={20} color={themeColors[theme].icon} />
          </View>
        </TouchableOpacity>
  )

}





const createStyles = (theme: ThemeName) => StyleSheet.create({
containerInfoPacketCard: {
      flexDirection: 'row',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 8,
      padding: 10,
    },

    containerImagePacket: {
      width: 90,
      height: 90,
      borderRadius: 8,
      overflow: 'hidden',
    },

    imagePacket: {
      width: '100%',
      height: '100%',
    },

    containerInfoTextPacket: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },

    containerNamePacket: {
      marginBottom: 5,
    },

    textNamePacket: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerDataTripPacket: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      
    },
  
    containerTextCheckIn: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    
    containerTextCheckOut: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    
    textDataTripPacket: {
      fontSize: 14,
      color: themeColors[theme].textSecondary,
    },

    textDataSeparator: {
      color: themeColors[theme].realceBlue,
    },

    containerIconMore: {
      justifyContent: 'center',
      alignItems: 'center',
    },
})