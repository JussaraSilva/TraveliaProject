import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type CardDetailsGlobalProps = {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  onPressIcon?: () => void;
  showDivider?: boolean; // 👈 NOVO
}


export default function CardDetailsGlobal (
  { title, leftIcon, rightIcon, children, onPressIcon, showDivider }: CardDetailsGlobalProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);


  return (
    <View style={styles.containerCard}>
      {/* header */}
      <View style={[styles.header, !showDivider && styles.noDivider]}>
        <View style={styles.left}>
          {leftIcon}
          <Text style={styles.title}>{title}</Text>
        </View>

        {rightIcon && <TouchableOpacity style={styles.right}
                      onPress={onPressIcon}
        >{rightIcon}</TouchableOpacity>}
      </View>

      {/* body */}
      {children && (
        <View style={styles.body}>
          {children}
        </View>
      )}
    </View>
  );
}


const createStyles = (theme: ThemeName) => StyleSheet.create({
  containerCard: {
    backgroundColor: themeColors[theme].backgroundCard,
    borderRadius: 12,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomColor: themeColors[theme].borderColor,
    borderBottomWidth: 1, 
    paddingBottom: 10,
    width: '100%',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
    marginLeft: 8,
  },

  body: {
    flexDirection: 'column',
    gap: 8,
  },

  noDivider: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },

});