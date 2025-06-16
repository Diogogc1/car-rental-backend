import { IGetAllCarResponse } from 'src/modules/car/interfaces/dtos';
import { IGetAllUserResponse } from 'src/modules/user/interfaces/dto/responses';

export interface IGetAllReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetAllUserResponse;
  car?: IGetAllCarResponse;
}
