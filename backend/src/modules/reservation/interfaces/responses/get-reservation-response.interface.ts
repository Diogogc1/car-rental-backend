import { IGetCarByIdResponse } from 'src/modules/car/interfaces/dtos/responses';
import { IGetUserByIdResponse } from 'src/modules/user/interfaces/dto/responses';

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
