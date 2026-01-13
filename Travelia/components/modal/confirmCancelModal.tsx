import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors, ThemeName } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/theme/useThemedStyles';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmCancelModal({ visible, onConfirm, onCancel }: Props) {
  
  const { styles } = useThemedStyles(createStyles);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View
          style={styles.containerModal}
        >
          <Text style={styles.textModalTitle}>
            Cancel Booking
          </Text>

          <Text style={styles.textModalDescription}>
            Are you sure you want to cancel this booking and request a refund?
          </Text>

          <View
            style={styles.containerModalButtons}
          >
            <TouchableOpacity onPress={onCancel}
              style={styles.containerButtonCancel}
            >
              <Text style={styles.textCancel}>No, continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={styles.containerButtonConfirm}
            >
              <Text style={styles.textButtonConfirmCancel}>
                Yes, Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: ThemeName) => StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  containerModal: {
    backgroundColor: themeColors[theme].backgroundCard,
    padding: 24,
    borderRadius: 8,
    width: '80%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },

  textModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors[theme].textPrimary,
  },

  textModalDescription: {
    fontSize: 16,
    marginTop: 12,
    color: themeColors[theme].textPrimary,
  },

  containerModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 12,
  },

  textCancel: {
    color: themeColors[theme].textButton,
    fontWeight: 'bold',
  },

  containerButtonCancel: {
    backgroundColor: themeColors[theme].colorGreen,
    padding: 12,
    borderRadius: 8,
  },

  containerButtonConfirm: {
    backgroundColor: themeColors[theme].colorRed,
    padding: 12,
    borderRadius: 8,
  },

  textButtonConfirmCancel: {
    color: themeColors[theme].textButton,
    fontWeight: 'bold',
  },

  



})