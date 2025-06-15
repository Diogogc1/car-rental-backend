import { Reservation } from '../../../entities';
import { GetUserByIdResponse } from '../user/get-user-by-id.response';
import { GetCarByIdResponse } from '../car/get-car-by-id.response';

export interface IDeleteReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: GetUserByIdResponse;
  car?: GetCarByIdResponse;
}

export class DeleteReservationResponse implements IDeleteReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: GetUserByIdResponse;
  car?: GetCarByIdResponse;

  constructor(props: IDeleteReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.user = props.user;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): DeleteReservationResponse {
    return new DeleteReservationResponse({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
      user: undefined,
      car: undefined,
    });
  }
}
