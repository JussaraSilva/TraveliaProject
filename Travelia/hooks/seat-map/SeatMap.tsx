import { View, Text } from 'react-native';

import { Seat } from '@/assets/types/seat/seat.types';
import { initialSeats } from './seatData';
import SeatItem from './SeatItem';
import { styles } from '@/assets/types/seat/seat.styles';
import { Traveler } from '@/context/traveler/travelerContext';


type SeatMapProps = {
  travelers: Traveler[];
  flightType: 'departure' | 'return';
  currentPassengerIndex: number;
  onSelectSeat: (seatId: string) => void;
};



export default function SeatMap({
  travelers,
  flightType,
  currentPassengerIndex,
  onSelectSeat,
}: SeatMapProps) {

  const seats = initialSeats;
  const seatsWithStatus: Seat[] = seats.map(seat => {
  if (seat.status === 'unavailable') return seat;

  const occupiedByOtherTraveler = travelers.some(
    (traveler, index) =>
      index !== currentPassengerIndex &&
      traveler.seats?.[flightType] === seat.id
  );

  if (occupiedByOtherTraveler) {
    return { ...seat, status: 'occupied' };
  }

  const isSelectedByCurrent =
    travelers[currentPassengerIndex]?.seats?.[flightType] === seat.id;

  if (isSelectedByCurrent) {
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
