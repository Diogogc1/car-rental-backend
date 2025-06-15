export interface IUpdateReservationByIdPayload {
  id: string;
  startDate?: Date;
  endDate?: Date;
  carId?: number;
  userId?: number;
  totalPrice?: number;
}
