import { Pressable, Text } from 'react-native';
import { Seat } from '@/assets/types/seat/seat.types';
import { styles } from '@/assets/types/seat/seat.styles';
import { CheckIcon } from 'phosphor-react-native';

type Props = {
  seat: Seat;
  onPress: (seat: Seat) => void;
  isSelected: boolean;
};

export default function SeatItem({ seat, onPress, isSelected }: Props) {
  return (
    <Pressable
      disabled={
        seat.status === 'occupied' ||
        seat.status === 'unavailable'
      }
      onPress={() => onPress(seat)}
      style={[
        styles.seat,
        seat.status === 'available' && styles.available,
        seat.status === 'selected' && styles.selected,
        seat.status === 'occupied' && styles.occupied,
        seat.status === 'unavailable' && styles.unavailable,
      ]}
    >
      {seat.status === 'selected' ? (
        <CheckIcon size={20} weight="bold" color="#fff" />
      ) : (
        <Text style={[styles.seatText,seat.status !== 'available' && styles.selectText,]}>
          {`${seat.column}${seat.row}`}
        </Text>
      )}
    </Pressable>

  );
}
