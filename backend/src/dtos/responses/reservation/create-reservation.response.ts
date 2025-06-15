import { Reservation } from '../../../entities';

export interface ICreateReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export class CreateReservationResponse implements ICreateReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;

  constructor(props: ICreateReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
  }

  static fromEntity(reservation: Reservation): CreateReservationResponse {
    return new CreateReservationResponse({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
    });
  }
}
