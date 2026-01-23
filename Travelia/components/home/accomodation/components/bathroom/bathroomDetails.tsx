import { View, StyleSheet, Text } from 'react-native'
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShowerIcon } from 'phosphor-react-native';
import HighlightGroup from '../highlights/highlightGroup';
import HighlightsComp from '../highlights/highlightComp';


interface BathroomProps {
  chuveiro: string;
  chuveiroType: string;
  banheira: string;
  agua_quente: boolean;
  pressao: string;
  amenitiesBathroom: string
}

export default function BathroomDetails({chuveiro, chuveiroType, banheira, agua_quente, pressao, amenitiesBathroom}: BathroomProps) {
  const {theme, styles} = useThemedStyles(createStyles);


  return (
      <View style={styles.bathroomAmenitiesFixed}>
        <View style={styles.bathroomAmenitiesItems}>
          <View style={styles.containerItem}>
            <View style={styles.containerIconItem}>
                <ShowerIcon size={30} color={themeColors[theme].realceBlue} weight="bold"  />
            </View>
            <Text style={styles.textLabelItem}>
                Equipamento
            </Text>
            <Text style={styles.textItem}>
                {chuveiro}
            </Text>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.containerIconItem}>
                <MaterialCommunityIcons  name="shower" size={30} color={themeColors[theme].realceBlue} weight="bold"  />
            </View>
            <Text style={styles.textLabelItem}>
                Características
            </Text>
            <Text style={styles.textItem}>
                {chuveiroType}
            </Text>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.containerIconItem}>
                <MaterialCommunityIcons  name="bathtub-outline" size={30} color={themeColors[theme].realceBlue} weight="bold"  />
            </View>
            <Text style={styles.textLabelItem}>
                Banheira
            </Text>
            <Text style={styles.textItem}>
                {banheira}
            </Text>
          </View>
          
        </View>
        <View style={styles.bathroomAmenitiesDinamic}>
          <HighlightsComp
            label="Temperatura"
            service={agua_quente ? "Quente" : "Fria"} 
            iconService="water-thermometer-outline" 
          />
          <HighlightsComp
            label="Pressão"
            service={pressao} 
            iconService="shower-head" 
          />
        </View>
        <View style={styles.containerAmenitiesList}>

            <HighlightGroup 
            icon="package-variant-plus" 
            label="Amenidades" 
            value={amenitiesBathroom} 
            showIf={amenitiesBathroom !== ""}
            />
        </View>
      </View>
  )
}

const createStyles = (theme: ThemeName) => StyleSheet.create({

  bathroomAmenitiesFixed: {
    flex: 1,
    gap: 15,
    
  },

  bathroomAmenitiesItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',

  },

  containerItem: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  containerIconItem: {
      backgroundColor: themeColors[theme].realceLightBlue,
      borderRadius: 50,
      padding: 10,
    },
  
    textLabelItem: {
      
      fontSize: 14,
      color: themeColors[theme].textSecondary,
    },
  
    textItem: {
      textAlign: 'center',
      fontSize: 14,
      color: themeColors[theme].textPrimary,
      
    },

    containerAmenitiesList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      alignItems: 'center',
    },

    bathroomAmenitiesDinamic: {
      
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      alignItems: 'center',
    },
})