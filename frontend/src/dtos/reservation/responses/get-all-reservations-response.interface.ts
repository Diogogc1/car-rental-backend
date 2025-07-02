import { IGetAllCarResponse } from "@/dtos/car/responses";
import { IGetAllUserResponse } from "@/dtos/user/responses";

export interface IGetAllReservationResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: IGetAllUserResponse;
  car: IGetAllCarResponse;
}
