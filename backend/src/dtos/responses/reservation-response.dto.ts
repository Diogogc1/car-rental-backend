export class ReservationResponseDto {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;

  constructor(
    id: number,
    userId: number,
    carId: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.carId = carId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
