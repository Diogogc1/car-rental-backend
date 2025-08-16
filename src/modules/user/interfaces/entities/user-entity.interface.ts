import { IReservation } from '../../../reservation/interfaces/entities';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  reservations?: IReservation[];
}
