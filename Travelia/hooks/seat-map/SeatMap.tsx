import { View, Text } from 'react-native';

import { Seat } from '@/assets/types/seat/seat.types';
import { initialSeats } from './seatData';
import SeatItem from './SeatItem';
import { styles } from '@/assets/types/seat/seat.styles';


type SeatMapProps = {
  selectedSeats: string[];
  currentPassengerIndex: number;
  onSelectSeat: (seatId: string) => void;
};




export default function SeatMap({ selectedSeats,
  currentPassengerIndex,
  onSelectSeat, }: SeatMapProps) {

  const seats = initialSeats;
  const occupiedByOthers = selectedSeats.filter(
    (_, index) => index !== currentPassengerIndex
  );

  const currentPassengerSeat = selectedSeats[currentPassengerIndex];

  const seatsWithStatus: Seat[] = seats.map(seat => {
    if (seat.status === 'unavailable') return seat;

    if (occupiedByOthers.includes(seat.id)) {
      return { ...seat, status: 'occupied' };
    }

    if (seat.id === currentPassengerSeat) {
      return { ...seat, status: 'selected' };
    }

    return { ...seat, status: 'available' };
  });



  function handleSelectSeat(selectedSeat: Seat) {
    if (
      selectedSeat.status === 'occupied' ||
      selectedSeat.status === 'unavailable'
    ) {
      return;
    }

    onSelectSeat(selectedSeat.id);
  }

  const rows = [...new Set(seatsWithStatus.map(seat => seat.row))];



  return (
    <View>
      {rows.map(row => {
      const rowSeats = seatsWithStatus.filter(
          seat => seat.row === row
        );



        return (
          <View key={row} style={styles.row}>
            {/* Lado esquerdo */}
            {rowSeats
              .filter(seat => seat.column === 'A' || seat.column === 'B')
              .map(seat => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  onPress={handleSelectSeat}
                  isSelected={seat.status === 'selected'}
                />
              ))}

            {/* Corredor com número da linha */}
            <View style={styles.aisle}>
              <Text style={styles.rowLabel}>{row}</Text>
            </View>

            {/* Lado direito */}
            {rowSeats
              .filter(seat => seat.column === 'C' || seat.column === 'D')
              .map(seat => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  onPress={handleSelectSeat}
                  isSelected={seat.status === 'selected'}
                />
              ))}
          </View>
        );
      })}
    </View>
  );
}
