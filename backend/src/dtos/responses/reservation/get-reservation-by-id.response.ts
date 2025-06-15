import { Reservation } from '../../../entities';
import { IGetCarByIdResponse } from '../car/get-car-by-id.response';
import { IGetUserByIdResponse } from '../user/get-user-by-id.response';

export interface IGetReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car?: IGetCarByIdResponse;
}

export class GetReservationByIdResponse implements IGetReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car?: IGetCarByIdResponse;

  constructor(props: IGetReservationByIdResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.user = props.user;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): GetReservationByIdResponse {
    return new GetReservationByIdResponse({
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
