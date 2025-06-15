import { Reservation } from '../../../entities';
import { IGetUserByIdResponse } from '../user/get-user-by-id.response';
import { IGetCarByIdResponse } from '../car/get-car-by-id.response';

export interface IUpdateReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car?: IGetCarByIdResponse;
}

export class UpdateReservationByIdResponse
  implements IUpdateReservationByIdResponse
{
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car?: IGetCarByIdResponse;

  constructor(props: IUpdateReservationByIdResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.user = props.user;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): UpdateReservationByIdResponse {
    return new UpdateReservationByIdResponse({
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
