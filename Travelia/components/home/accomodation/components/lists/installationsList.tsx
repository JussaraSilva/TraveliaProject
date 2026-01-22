import { View, Text, StyleSheet } from 'react-native';

import { useThemedStyles } from '@/hooks/theme/useThemedStyles';


import { themeColors, ThemeName } from '@/constants/theme';
import { detectInstallationCategory } from '@/hooks/config/detectInstallationHotel/detectInstallationCategory';
import { INSTALLATIONS_MAP } from '@/hooks/config/detectInstallationHotel/instalations.config';

type Props = {
  instalacoes: string[];
};

export function InstallationsList({ instalacoes }: Props) {
  const { theme, styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.contentInstalacoes}>
      {instalacoes.map((instalacao, index) => {
        const category = detectInstallationCategory(instalacao);
        const Icon = INSTALLATIONS_MAP[category]?.icon;

        if (!Icon) return null;

        return (
          <View key={index} style={styles.containerInstalacao}>
            <View style={styles.iconInstalacao}>
              <Icon
                size={22}
                color={themeColors[theme].realceBlue}
                weight="light"
              />
            </View>

            <Text
              style={styles.textInstalacao}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {instalacao}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create({
  contentInstalacoes: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
    gap:20,
  },
  
  containerInstalacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '45%', // 👈 duas colunas
},

  textInstalacao: {
    flex: 1,
    fontSize: 16,
    color: themeColors[theme].textPrimary,
  },

  iconInstalacao: {
    backgroundColor: themeColors[theme].realceLightBlue,
    borderRadius: 50,
    padding: 10,
  },
});
