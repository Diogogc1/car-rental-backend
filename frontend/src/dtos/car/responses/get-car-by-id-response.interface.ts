import { IGetReservationByIdResponse } from "@/dtos/reservation/responses";

export interface IGetCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IGetReservationByIdResponse[];
}
