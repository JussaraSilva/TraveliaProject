import { themeColors, ThemeName } from '@/constants/theme';
import { useTheme } from '@/context/themeProvider';
import { CopyIcon } from 'phosphor-react-native';
import { ReactNode, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


interface paymentProps {
  paymentInfo: {
    label: string;
    value: ReactNode;
    type?: string;
    copy?: boolean;
  }[];
  cardTitle: string;
  iconTitle: React.ReactNode
}
export default function PaymentInfoCard({paymentInfo,cardTitle,iconTitle}:paymentProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.headerTitle}>
        {iconTitle}
        <Text style={styles.title}>{cardTitle}</Text>
      </View>

      {paymentInfo.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>

          <View style={styles.valueContainer}>
            {item.type === 'badge' ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.value}</Text>
              </View>
            ) : (
              <Text style={styles.value}
                numberOfLines={2}
                ellipsizeMode="tail"
              >{item.value}</Text>
            )}

            {item.copy && (
              <TouchableOpacity>
                <CopyIcon size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: ThemeName) =>
  StyleSheet.create({
    card: {
      backgroundColor: themeColors[theme].backgroundCard,
      padding: 16,
      borderRadius: 8,
      
      
    },

    headerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderBottomColor: themeColors[theme].borderColor,
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,

      
    },
    label: {
      fontSize: 14,
      color: themeColors[theme].textSecondary,
    },

    valueContainer: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    value: {
      fontSize: 16,
      textAlign: 'right',
      fontWeight: 'bold',
      color: themeColors[theme].textPrimary,
    },
    badge: {
      backgroundColor: themeColors[theme].realceBlue,
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: themeColors[theme].textButton,
    },

    copy: {
      marginLeft: 8,
    },

    copyIcon: {
      width: 16,
      height: 16,
    },


  });
