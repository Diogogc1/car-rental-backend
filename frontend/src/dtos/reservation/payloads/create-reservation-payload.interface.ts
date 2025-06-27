export interface ICreateReservationPayload {
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;
}
