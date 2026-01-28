import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { CaretRightIcon, ClockIcon, DotIcon } from 'phosphor-react-native';
import { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';

type Atividade = {
  nome: string;
  duracao: string;
  dificuldade: string;
  incluso: boolean;
  preco_extra?: number;
};

type Props = {
  include: string;
  checkIn: string;
  checkOut: string;
  duracao: number;
  includeStyle?: StyleProp<ViewStyle>;
  nome_pacote: string;
  atividades?: Atividade[];
  quantidade_pessoas: number;
  tipo?: string;
  idade_minima?: number;
  onPressChangeOption?: () => void;
};

export default function ActivitiesInfo({
  include,
  checkIn,
  checkOut,
  duracao,
  includeStyle,
  nome_pacote,
  atividades = [],
  quantidade_pessoas,
  tipo,
  idade_minima,
  onPressChangeOption,
}: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.cardActivity}>
        <View style={styles.containerDays}>
          <Text style={styles.textQtdDays}>{duracao} dias</Text>
        </View>
        <View style={[styles.cardTitleHeader, includeStyle]}>
          <Text style={styles.textCardTitle}>{include}</Text>
        </View>
        <View style={styles.cardActivityTop}>
          <View style={styles.containerTextCheck}>
            <View style={styles.containerTextCheckIn}>
              <DotIcon size={30} color='green' weight='duotone' />
              <Text style={styles.textDateCheckIn}>{checkIn}</Text>
            </View>
            <View style={styles.containerTextCheckOut}>
              <DotIcon size={30} color='red' weight='duotone' />
              <Text style={styles.textDateCheckOut}>{checkOut}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.containerArrow}>
            <CaretRightIcon
              size={30}
              color={themeColors[theme].icon}
              weight='light'
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardActivityMiddle}>
          <View style={styles.rowActivityContainer}>
            <View style={styles.containerCardActivityTitle}>
              <Text style={styles.textCardActivityTitle}>{nome_pacote}</Text>
            </View>

            <View style={styles.containerActivity}>
              {atividades.map((atividade, index) => (
                <View
                  key={index}
                  style={styles.containerHorizontalCards} // 👈 AGORA O CARD ESTÁ AQUI
                >
                <TouchableOpacity style={styles.btnInclude}>
                        <View style={styles.containerStatus}>
                          <Text style={styles.textStatus}>{atividade.incluso ? 'Incluso' : 'Opcional'}</Text>

                          {!atividade.incluso && atividade.preco_extra && (
                          <Text style={styles.textStatus}>+ R$ {atividade.preco_extra}</Text>
                          )}
                        </View>
                  </TouchableOpacity>

                  <View style={styles.containerTitleActivity}>
                    <Text style={styles.titleActivity}>{atividade.nome}</Text>
                  </View>

                  <View style={styles.containerInfoActivity}>
                    <View style={styles.containerIconActivity}>
                      <ClockIcon
                        size={18}
                        color={themeColors[theme].icon}
                        weight='light'
                      />
                      <Text style={styles.textInfoActivity}>
                        {atividade.duracao}
                      </Text>

                      <DotIcon size={15} color='green' weight='duotone' />

                      <View style={styles.containerDificultActivity}>
                        <Text style={styles.textDificultActivity}>
                          {atividade.dificuldade}
                        </Text>
                      </View>
                    </View>

                      
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.cardActivityBottom}>
          <View style={styles.containerQtdPessoas}>
              <Text style={styles.textQtdPessoas}>Pacote para: {quantidade_pessoas} pessoas</Text>
              <Text style={styles.textTipoPacote}>Categoria: {tipo}</Text>
              <Text style={styles.textIdadeMinima}>Idade Mínima: {idade_minima} anos</Text>
          </View>
          <View style={styles.containerBtnChange}>
            <TouchableOpacity style={styles.containerButtonEdit}
              onPress={onPressChangeOption}
            >
              <Text style={styles.textButtonEdit}>Change Option</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 20,
    },

    cardActivity: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].backgroundCard,
      borderRadius: 10,
      padding: 10,
      gap: 5,
      width: 370,
      
    },

    containerDays: {
      position: 'absolute',
      top: -16,
      right: 0,
      backgroundColor: themeColors[theme].realceBlue,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    textQtdDays: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    cardTitleHeader: {
      position: 'absolute',
      top: -16,
      left: 0,
      borderBottomEndRadius: 10,
      borderTopStartRadius: 10,
      backgroundColor: themeColors[theme].realceBlue,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textCardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    cardActivityTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      width: '100%',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: themeColors[theme].borderColor,
    },

    containerTextCheck: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },

    containerTextCheckIn: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    containerTextCheckOut: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    textDateCheckIn: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    textDateCheckOut: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerArrow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    cardActivityMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      maxWidth: '100%',
    },

    rowActivityContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      paddingHorizontal: 5,
      paddingVertical: 5,
    },

    containerCardActivityTitle: {
      width: '100%',
      borderRadius: 20,
      alignItems: 'center',
    },

    textCardActivityTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
      textAlign: 'center',
    },

    containerHorizontalCards: {
      width: '48%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors[theme].background,
      borderRadius: 10,
      shadowColor: themeColors[theme].shadowColor,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      paddingHorizontal: 10,
      paddingVertical: 25,
      height: 90,
    },

    containerActivity: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },

    containerTitleActivity: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'flex-end',
      height: 60,
    },

    titleActivity: {
      fontSize: 15,
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },

    containerInfoActivity: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '100%',
    },

    containerIconActivity: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gap: 2,
      // paddingHorizontal: 5,
    },

    textInfoActivity: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerDificultActivity: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    textDificultActivity: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    btnInclude: {
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    containerStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 5,
      backgroundColor: themeColors[theme].colorGreen,
      padding: 5,
      borderTopStartRadius: 20,
      borderBottomStartRadius: 50,
      zIndex: 1,
    },


    textStatus: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    cardActivityBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: themeColors[theme].borderColor,
      paddingTop: 5,
    },

    containerQtdPessoas: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: 5,
      padding: 10,
      width: '60%',
    },

    textQtdPessoas: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    textTipoPacote: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    textIdadeMinima: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textSecondary,
    },

    containerBtnChange: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '40%',
    },

    containerButtonEdit: {
      alignItems: 'center',
      width: '100%',
      padding: 10,
      borderRadius: 30,
      backgroundColor: themeColors[theme].realceLightBlue,
    },

    textButtonEdit: {
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors[theme].textColorButtonRealce,
    },

    



    
  });
