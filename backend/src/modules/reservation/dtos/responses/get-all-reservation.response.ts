import { IGetAllCarResponse } from 'src/modules/car/interfaces/dtos/responses';
import { IGetAllUserResponse } from 'src/modules/user/interfaces/dto/responses';
import { Reservation } from '../../entities';
import { IGetAllReservationResponse } from '../../interfaces/responses';

export class GetAllReservationResponse implements IGetAllReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetAllUserResponse;
  car?: IGetAllCarResponse;

  constructor(props: IGetAllReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.user = props.user;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): GetAllReservationResponse {
    return new GetAllReservationResponse({
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
