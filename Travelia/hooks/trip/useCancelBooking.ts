import { useState } from 'react';
import { Alert } from 'react-native';
import { deleteTrip } from '@/services/tripStorage';
import { useRouter } from 'expo-router';

type UseCancelBookingProps = {
  pacoteFinal: any;
};

export function useCancelBooking({ pacoteFinal }: UseCancelBookingProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function openCancelModal() {
    setVisible(true);
  }

  function closeCancelModal() {
    if (!loading) setVisible(false);
  }

  async function confirmCancelBooking() {
    if (!pacoteFinal?.id) return;

    try {
      setLoading(true);
      await deleteTrip(pacoteFinal.id);
      setVisible(false);
      router.replace('/(app)/_tabs/myTrips');
    } catch {
      Alert.alert('Error', 'Failed to cancel booking.');
    } finally {
      setLoading(false);
    }
  }

  return {
    visible,
    openCancelModal,
    closeCancelModal,
    confirmCancelBooking,
    loading,
  };
}
