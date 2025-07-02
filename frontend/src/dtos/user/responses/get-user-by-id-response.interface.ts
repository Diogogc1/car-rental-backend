import { IGetAllReservationResponse } from "@/dtos/reservation/responses";

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  email: string;
  reservations?: IGetAllReservationResponse[];
}
