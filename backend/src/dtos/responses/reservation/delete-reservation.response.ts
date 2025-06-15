import { Reservation } from '../../../entities';

export interface IDeleteReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export class DeleteReservationResponse implements IDeleteReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;

  constructor(props: IDeleteReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
  }

  static fromEntity(reservation: Reservation): DeleteReservationResponse {
    return new DeleteReservationResponse({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
    });
  }
}
