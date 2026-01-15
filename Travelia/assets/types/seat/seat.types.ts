export type SeatStatus = 
  | 'available'
  | 'selected'
  | 'occupied'
  | 'unavailable';

export type Seat = {
  id: string;
  row: number;
  column: string;
  status: SeatStatus;
};

