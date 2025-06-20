export interface IUpdateReservationByIdPayload {
  id: number;
  startDate?: Date;
  endDate?: Date;
  carId?: number;
  userId?: number;
  totalPrice?: number;
}
