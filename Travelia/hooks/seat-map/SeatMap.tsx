import { useState } from 'react';
import { View, Text } from 'react-native';

import { Seat } from '@/assets/types/seat/seat.types';
import { initialSeats } from './seatData';
import SeatItem from './SeatItem';
import { styles } from '@/assets/types/seat/seat.styles';


type SeatMapProps = {
  selectedPassengerIndex: number;
  onSelectSeat: (seatId: string) => void;
  selectedSeatByPassenger?: string; // 👈 assento atual do passageiro
};

export default function SeatMap({ selectedPassengerIndex, onSelectSeat, selectedSeatByPassenger }: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  

  function handleSelectSeat(selectedSeat: Seat) {
  // não deixa clicar em ocupado
  if (selectedSeat.status === 'occupied') return;

  setSeats(prev =>
    prev.map(seat => {
      // libera assento antigo do passageiro
      if (seat.id === selectedSeatByPassenger) {
        return { ...seat, status: 'available' };
      }

      // ocupa o novo
      if (seat.id === selectedSeat.id) {
        return { ...seat, status: 'occupied' };
      }

      return seat;
    })
  );

  // atualiza o passageiro IMEDIATAMENTE
  onSelectSeat(selectedSeat.id);
}


  const rows = [...new Set(seats.map(seat => seat.row))];

  return (
    <View>
      {rows.map(row => {
        const rowSeats = seats.filter(seat => seat.row === row);

        return (
          <View key={row} style={styles.row}>
            <SeatItem seat={rowSeats.find(s => s.column === 'A')!} onPress={handleSelectSeat} />
            <SeatItem seat={rowSeats.find(s => s.column === 'B')!} onPress={handleSelectSeat} />

            <View style={styles.aisle}>
              <Text>{row}</Text>
            </View>

            <SeatItem seat={rowSeats.find(s => s.column === 'C')!} onPress={handleSelectSeat} />
            <SeatItem seat={rowSeats.find(s => s.column === 'D')!} onPress={handleSelectSeat} />
          </View>
        );
      })}
    </View>
  );
}
