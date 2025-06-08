export class ReservationResponseDto {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;

  constructor(reservation: ReservationResponseDto) {
    this.id = reservation.id;
    this.userId = reservation.userId;
    this.carId = reservation.carId;
    this.startDate = reservation.startDate;
    this.endDate = reservation.endDate;
  }
}
