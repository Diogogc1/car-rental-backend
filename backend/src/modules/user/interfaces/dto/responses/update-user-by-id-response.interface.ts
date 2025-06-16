import { IGetAllReservationResponse } from 'src/modules/reservation/interfaces/responses';

export interface IUpdateUserByIdResponse {
  id: number;
  name: string;
  email: string;
  reservations?: IGetAllReservationResponse[];
}
