
import TimelineItem from "@/components/atividades/timelineItem";
import ButtonFilter from "@/components/buttons/buttonFilters";
import HeaderGlobal from "@/components/header/headerGlobal";
import { DateText } from "@/components/utils/date/formatDate";

import { themeColors, ThemeName } from "@/constants/theme";
import { useBooking } from "@/context/booking/bookingContext";
import getDetalhamentoAtividade from "@/hooks/config/getDetalhamentoAtividade";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { router } from "expo-router";
import { DotsThreeOutlineVerticalIcon, XIcon } from "phosphor-react-native";
import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useItineraryData } from "@/hooks/itinerary/useItineraryData";



export default function Itinerary() {
  const { theme, styles } = useThemedStyles(createStyles);
  const { pacoteOriginal } = useBooking();

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  
  // AQUI: Você extrai as variáveis de dentro do hook
  const { filterDays, diasParaRenderizar } = useItineraryData(pacoteOriginal, selectedDayIndex);

  // DEBUG: Abra o console e veja o que aparece aqui
  console.log("Pacote:", !!pacoteOriginal);
  console.log("Dias para Renderizar:", diasParaRenderizar?.length);

  // Se a tela está branca, mude para isso temporariamente:
  if (!pacoteOriginal) {
    return <View style={styles.container}><Text>Sem Pacote Original</Text></View>;
  }





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderGlobal 
          titlePage="Itinerary" 
          leftIcons={[<XIcon key="back" size={24} color={themeColors[theme].icon} />]}
          onPressLeftIcon={router.back}
          rightIcons={[<DotsThreeOutlineVerticalIcon key="options" size={24} color={themeColors[theme].icon} />]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.filter}>
          <ButtonFilter 
            labels={filterDays}
            activeIndex={selectedDayIndex}
            onPress={setSelectedDayIndex}
            backgroundAtivoStyle={styles.viewActiveFilter}
            activeTextStyle={styles.textActiveFilter}
          />
        </View>

        <ScrollView style={styles.containerItinerary} showsVerticalScrollIndicator={false}>
          {diasParaRenderizar.map((dia: any, indexDia: number) => (
            <View key={`dia-${dia.dia}`}>
              
              <View style={styles.sectionHeader}>
                <DateText 
                    value={pacoteOriginal?.estadia?.checkin} 
                    variant="itinerary" 
                    addDays={dia.dia - 1} 
                    textStyle={styles.sectionHeaderText} 
                  />
              </View>

              {dia.atividades.map((itemNome: string, indexAtividade: number) => {
                const dados = getDetalhamentoAtividade(itemNome, pacoteOriginal.atividades || []);
                
                return (
                  <TimelineItem 
                    key={`${dia.dia}-${indexAtividade}`}
                    hora={dados.horario}
                    titulo={dados.titulo}
                    isFirst={indexDia === 0 && indexAtividade === 0}
                    isLast={indexDia === diasParaRenderizar.length - 1 && indexAtividade === dia.atividades.length - 1}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].backgroundCard,
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

  textActiveFilter: {
    color: themeColors[theme].textButton,
  },

  containerItinerary: {
    flex: 1,
    marginTop: 16,
  },

  sectionHeader: {
  paddingVertical: 15,
  backgroundColor: themeColors[theme].backgroundCard, // Cor de fundo da tela
  zIndex: 10,
},
sectionHeaderText: {
  fontSize: 14,
  fontWeight: '600',
  color: themeColors[theme].textSecondary,
  textTransform: 'uppercase',
},
})