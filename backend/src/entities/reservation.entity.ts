export class Reservation {
  id: number;
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;

  constructor(
    id: number,
    startDate: Date,
    endDate: Date,
    carId: number,
    userId: number,
    totalPrice: number,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.carId = carId;
    this.userId = userId;
    this.totalPrice = totalPrice;
  }
}
