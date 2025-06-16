import { IDeleteReservationResponse } from 'src/modules/reservation/interfaces/responses';

export interface IDeleteUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: IDeleteReservationResponse[];
}
