import { TouchableOpacity, Text } from 'react-native';
import { Seat } from '@/assets/types/seat/seat.types';
import { styles } from '@/assets/types/seat/seat.styles';

type Props = {
  seat: Seat;
  onPress: (seat: Seat) => void;
};

export default function SeatItem({ seat, onPress }: Props) {
  return (
    <TouchableOpacity
      disabled={seat.status === 'occupied'}
      onPress={() => onPress(seat)}
      style={[
        styles.seat,
        styles[seat.status],
      ]}
    >
      <Text style={styles.seatText}>{seat.id}</Text>
    </TouchableOpacity>
  );
}
