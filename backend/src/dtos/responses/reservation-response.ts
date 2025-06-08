export interface IReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export class ReservationResponse implements IReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;

  constructor(reservationResponse: IReservationResponse) {
    this.id = reservationResponse.id;
    this.userId = reservationResponse.userId;
    this.carId = reservationResponse.carId;
    this.startDate = reservationResponse.startDate;
    this.endDate = reservationResponse.endDate;
    this.totalPrice = reservationResponse.totalPrice;
  }
}
