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

  static create(reservation: IReservation) {
    const newReservation = new Reservation(reservation);
    if (newReservation.getDurationInDays() > 30) {
      throw new Error('Reservation cannot exceed 30 days');
    }
    return newReservation;
  }

  getDurationInDays(): number {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
    );
    return duration > 0 ? duration : 0;
  }

  hasFinished(): boolean {
    const now = new Date();
    return this.endDate < now;
  }

  update({
    startDate,
    endDate,
    carId,
    userId,
    totalPrice,
  }: Partial<IReservation>): void {
    if (startDate !== undefined) {
      this.startDate = startDate;
    }
    if (endDate !== undefined) {
      this.endDate = endDate;
    }
    if (carId !== undefined) {
      this.carId = carId;
    }
    if (userId !== undefined) {
      this.userId = userId;
    }
    if (totalPrice !== undefined) {
      this.totalPrice = totalPrice;
    }
  }
}
