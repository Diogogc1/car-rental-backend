import { IGetAllReservationResponse } from 'src/modules/reservation/interfaces/responses';

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  email: string;
  reservations?: IGetAllReservationResponse[];
}
