import { IGetCarByIdResponse } from 'src/modules/car/interfaces/dtos/responses';
import { IGetUserByIdResponse } from 'src/modules/user/interfaces/dto/responses';
import { Reservation } from '../../entities';
import { IGetReservationByIdResponse } from '../../interfaces/responses';

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
