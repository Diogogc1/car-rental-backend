import { IGetAllReservationResponse } from 'src/modules/reservation/interfaces/responses';

export interface IGetAllUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: IGetAllReservationResponse[];
}
