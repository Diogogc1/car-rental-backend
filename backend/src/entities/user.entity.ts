import { Reservation } from './reservation.entity';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  reservations?: Reservation[];
}

export class User implements IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  reservations?: Reservation[];

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.reservations = user.reservations;
  }
}
