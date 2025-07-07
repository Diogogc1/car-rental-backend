import { IGetAllCarResponse } from 'src/modules/car/interfaces/dtos/responses';

export interface IGetManyReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  car?: IGetAllCarResponse;
}
