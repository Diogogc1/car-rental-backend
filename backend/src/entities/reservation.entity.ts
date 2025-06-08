export class Reservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;

  constructor(reservation: Reservation) {
    this.id = reservation.id;
    this.startDate = reservation.startDate;
    this.endDate = reservation.endDate;
    this.carId = reservation.carId;
    this.userId = reservation.userId;
    this.totalPrice = reservation.totalPrice;
  }
}
