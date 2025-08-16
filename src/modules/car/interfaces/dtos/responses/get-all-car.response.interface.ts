import { IGetManyReservationResponse } from 'src/modules/reservation/interfaces/responses';

export interface IGetAllCarResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  reservations?: IGetManyReservationResponse[];
}
