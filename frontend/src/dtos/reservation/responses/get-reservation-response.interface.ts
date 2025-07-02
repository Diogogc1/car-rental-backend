import { IGetCarByIdResponse } from "@/dtos/car/responses";
import { IGetUserByIdResponse } from "@/dtos/user/responses";

export interface IGetReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetUserByIdResponse;
  car: IGetCarByIdResponse;
}
