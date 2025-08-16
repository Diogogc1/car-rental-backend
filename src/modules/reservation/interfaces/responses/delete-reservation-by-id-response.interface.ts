export interface IDeleteReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}
