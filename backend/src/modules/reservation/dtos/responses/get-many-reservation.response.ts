import { GetCarByIdResponse } from 'src/modules/car/dtos/responses';
import { IGetAllCarResponse as IGetCarByIdResponse } from 'src/modules/car/interfaces/dtos/responses';
import { Reservation } from '../../entities';
import { IGetManyReservationResponse } from '../../interfaces/responses';

export class GetManyReservationResponse implements IGetManyReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  car?: IGetCarByIdResponse;

  constructor(props: IGetManyReservationResponse) {
    this.id = props.id;
    this.userId = props.userId;
    this.carId = props.carId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.totalPrice = props.totalPrice;
    this.car = props.car;
  }

  static fromEntity(reservation: Reservation): GetManyReservationResponse {
    return new GetManyReservationResponse({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
      car: reservation.car
        ? GetCarByIdResponse.fromEntity(reservation.car)
        : undefined,
    });
  }
}
