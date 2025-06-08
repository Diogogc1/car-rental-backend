export interface IReservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;
}

export class Reservation implements IReservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;

  constructor(reservation: IReservation) {
    this.id = reservation.id;
    this.startDate = reservation.startDate;
    this.endDate = reservation.endDate;
    this.carId = reservation.carId;
    this.userId = reservation.userId;
    this.totalPrice = reservation.totalPrice;
  }
}
