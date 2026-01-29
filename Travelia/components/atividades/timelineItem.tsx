// components/TimelineItem.tsx
import { themeColors, ThemeName } from '@/constants/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

interface TimelineItemProps {
  hora: string;
  titulo: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem = ({ hora, titulo, isFirst, isLast }: TimelineItemProps) => {

  const {styles} = useThemedStyles(createStyles);


  return (
    <View style={styles.container}>
      {/* Linha do tempo */}
      <View style={styles.timelineContainer}>
        <View style={[
          styles.verticalLine,
          isFirst && styles.verticalLineFirst,
          isLast && styles.verticalLineLast
        ]} />
        <View style={styles.dot} />
      </View>
      
      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.hora}>
          {hora === 'conforme voo' ? 'Conforme voo' : `${hora}h`}
        </Text>
        <Text style={styles.titulo}>{titulo}</Text>
        
        {/* Indicador visual para horários sugeridos */}
        {hora.includes('conforme') || hora === '09:00' ? (
          <Text style={styles.sugeridoText}>Horário sugerido</Text>
        ) : null}
      </View>
    </View>
  );
};

const createStyles = (theme: ThemeName) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  verticalLine: {
    width: 2,
    backgroundColor: themeColors[theme].backgroundCard,
    flex: 1,
    marginVertical: 4,
  },
  verticalLineFirst: {
    marginTop: 12, // Ajusta início da linha
  },
  verticalLineLast: {
    flex: 0, // Remove linha no último item
    height: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: themeColors[theme].realceBlue,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    paddingTop: -2,
  },
  hora: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors[theme].realceBlue,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    color: themeColors[theme].textPrimary,
    lineHeight: 22,
  },
  sugeridoText: {
    fontSize: 12,
    color: themeColors[theme].textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
});

export default TimelineItem;