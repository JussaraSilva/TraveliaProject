import HeaderGlobal from '@/components/header/headerGlobal'
import { themeColors, ThemeName } from '@/constants/theme'
import { useHotel } from '@/context/hotel/hotelProvider'
import { useThemedStyles } from '@/hooks/theme/useThemedStyles'
import { CaretLeftIcon, CheckIcon} from 'phosphor-react-native'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PolicySection } from '@/components/accomodationPolicies/policySection'
import { router } from 'expo-router'



export default function AccomodationPolicies() {
  const { theme,styles } = useThemedStyles(createStyles)

  const {hotelSelecionado} = useHotel();

  if (!hotelSelecionado) {
    return null; // ou loading / fallback
  }


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
              onPressLeftIcon={
                router.back
              }
            />
        </View>

        <ScrollView style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
            <View style={styles.contentTop}>
              <View style={styles.contentTopTextTitle}>
                <Text style={styles.contentTopTitle}>
                  {hotelSelecionado.nome_hotel}
                </Text>                
              </View>
              <View style={styles.contentTopTextDescription}>
                <Text style={styles.contentTopResume}>
                  {hotelSelecionado.accommodation_policies.introducao}
                </Text>
              </View>
            </View>

            <View style={styles.contentPolicies}>

              <View style={styles.contentCheckIn}>
                <PolicySection
                  title="Check-in & Check-out"
                  icon={
                  <CheckIcon size={15} weight="bold" color={themeColors[theme].textButton} />
                  }
                  data={hotelSelecionado.accommodation_policies.check_in_out}
                />
              </View>

              <View style={styles.contentRulerCheckInRules}>
                <PolicySection
                  title="Regras de Check-in"
                  icon={<MaterialCommunityIcons name="clock-alert" size={20} color={themeColors[theme].textButton} />}
                  data={hotelSelecionado.accommodation_policies.regras_check}
                />
              </View>

              <View style={styles.contentIdentificationRequirement}>
                  <PolicySection
                    title="Identificação Exigida"
                    icon={<MaterialCommunityIcons name="card-account-details" size={20} color={themeColors[theme].textButton} />}
                    data={hotelSelecionado.accommodation_policies.identification_requirement}
                  />

              </View>

              <View style={styles.contentChildrenExtraBeds}>
                  <PolicySection
                    title="Crianças e Camas Extras"
                    icon={<MaterialCommunityIcons name="baby-carriage" size={20} color={themeColors[theme].textButton} />}
                    data={hotelSelecionado.accommodation_policies.criancas_camas_extras}
                  />
              </View>

              <View style={styles.contentSmokingPolicies}>
                  <PolicySection
                    title="Política de Fumo"
                    icon={<MaterialCommunityIcons name="smoking" size={20} color={themeColors[theme].textButton} />}
                    data={hotelSelecionado.accommodation_policies.politicas_fumantes}
                  />
              </View>
            </View>
        </ScrollView>
    </View>
  )
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    paddingHorizontal : 10,
  },

  containerHeader: {
  
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    
  },
  contentTop: {
    marginBottom: 24,
  },
  contentTopTextTitle: {
    marginBottom: 8,
  },
  contentTopTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: themeColors[theme].textPrimary,
  },

  contentTopTextDescription: {
    
  },

  contentTopResume: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  contentPolicies: {
    marginBottom: 16,
  },

  contentPoliciesTitleTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  contentCheckInIconContainer: {
    backgroundColor: themeColors[theme].colorGreen,
    borderRadius: 5,
    padding: 5,
  },

  contentCheckInTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: themeColors[theme].textPrimary,
  },

  contentCheckIn: {
    maxWidth: '90%',
    
  },

  contentCheckInText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  contentCheckInResume: {
    fontSize: 16,
    color: themeColors[theme].textSecondary,
  },

  contentCheckInRules: {
    marginTop: 16,
  },

  contentRulerCheckInIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  contentRulerCheckInIconContainer: {
    backgroundColor: themeColors[theme].colorGreen,
    borderRadius: 5,
    padding: 5,
  },

  contentRulerCheckInTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: themeColors[theme].textPrimary,
  },

  contentRulerCheckInRules: {
    maxWidth: '90%',
  },

  contentIdentificationRequirement: {
    marginTop: 16,
  },

  contentIdentificationRequirementIcon: {
    backgroundColor: themeColors[theme].colorGreen,
    borderRadius: 5,
    padding: 5,
  },

  contentIdentificationRequirementTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: themeColors[theme].textPrimary,
  },

  contentChildrenExtraBeds: {
    marginTop: 16,
  },

  contentChildrenExtraBedsIcon: {
    backgroundColor: themeColors[theme].colorGreen,
    borderRadius: 5,
    padding: 5,
  },

  contentChildrenExtraBedsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: themeColors[theme].textPrimary,
  },

  contentSmokingPolicies: {
    marginTop: 16,
    paddingBottom: 24,
  },

  contentSmokingPoliciesIcon: {
    backgroundColor: themeColors[theme].colorGreen,
    borderRadius: 5,
    padding: 5,
  },

  contentSmokingPoliciesTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: themeColors[theme].textPrimary,
  },


})