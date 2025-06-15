import { Reservation } from '../../../entities';
import {
  GetCarByIdResponse,
  IGetCarByIdResponse,
} from '../car/get-car-by-id.response';
import {
  GetUserByIdResponse,
  IGetUserByIdResponse,
} from '../user/get-user-by-id.response';

export interface ICreateReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car?: IGetCarByIdResponse;
}

export class CreateReservationResponse implements ICreateReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: GetUserByIdResponse;
  car?: GetCarByIdResponse;

  constructor(props: ICreateReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.user = props.user;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): CreateReservationResponse {
    return new CreateReservationResponse({
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
