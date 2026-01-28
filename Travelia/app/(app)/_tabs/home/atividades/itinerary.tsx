import ButtonFilter from "@/components/buttons/buttonFilters";
import HeaderGlobal from "@/components/header/headerGlobal";
import { themeColors, ThemeName } from "@/constants/theme";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { router } from "expo-router";
import { DotsThreeOutlineVerticalIcon, XIcon } from "phosphor-react-native";
import { View, StyleSheet } from "react-native";



export default function Itinerary() {
  const { theme, styles} = useThemedStyles(createStyles);

  const filterDays = ['All', 'Day 1', 'Day 2', 'Day 3'];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <HeaderGlobal 
            titlePage="Itinerary" 
            leftIcons={
              [<XIcon
                key="back"
                size={24}
                color={themeColors[theme].icon}
              />]
            }
            onPressLeftIcon={router.back}
            rightIcons={[
              <DotsThreeOutlineVerticalIcon
                key="options"
                size={24}
                color={themeColors[theme].icon}
              />
            ]}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.filter}>
            <ButtonFilter 
              labels={filterDays}
              activeIndex={0}
              onPress={(index) => {
                // Lógica para lidar com a seleção do filtro
              }}
              backgroundAtivoStyle={styles.viewActiveFilter}
              
              activeTextStyle={{ color: themeColors[theme].textButton }}
            />
          </View>

        </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    paddingHorizontal: 10,
  },

  header: {
    paddingTop: 16,
  },
  content: {
    flex: 1,
    marginTop: 16,
  },

  filter: {
    height: 50,
  },

  viewActiveFilter: {
    backgroundColor: themeColors[theme].realceBlue,
    borderColor: themeColors[theme].realceBlue,
  },
})