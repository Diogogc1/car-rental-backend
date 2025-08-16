import { IGetReservationByIdResponse } from 'src/modules/reservation/interfaces/responses';

export interface IGetCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  reservations?: IGetReservationByIdResponse[];
}
