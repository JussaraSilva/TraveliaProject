export type SeatStatus = 'available' | 'occupied' | 'selected';

export type Seat = {
  id: string;        // A1, B2...
  row: number;
  column: 'A' | 'B' | 'C' | 'D';
  status: SeatStatus;
};

