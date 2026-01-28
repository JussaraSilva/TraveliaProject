import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';
import { themeColors, ThemeName } from '@/constants/theme';
import { DotIcon } from 'phosphor-react-native';


type PolicySectionProps = {
  title: string;
  icon: React.ReactNode;
  data: string[];
  iconStyleVariant?: StyleProp<ViewStyle>;

};

export function PolicySection({ title, icon, data, iconStyleVariant }: PolicySectionProps) {

  const {theme, styles} = useThemedStyles(createStyles);


  return (
    <View style={{ marginTop: 16 }}>
      <View style={styles.contentPoliciesTitleTop}>
        <View style={[styles.iconContainer, iconStyleVariant]}>
          {icon}
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.contentCheckInText}>
          <DotIcon size={30} weight="bold" color={themeColors[theme].borderColor} />
          <Text style={styles.contentCheckInResume}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create ({
  sectionTitle: {
  fontSize: 20,
  fontWeight: '500',
  color: themeColors[theme].textPrimary,
  }, 
  iconContainer: {
    marginRight: 8,
    backgroundColor: themeColors[theme].colorGreen,
    padding: 6,
    borderRadius: 6,
  },
  contentPoliciesTitleTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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


})
