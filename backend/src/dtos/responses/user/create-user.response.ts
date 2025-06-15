import { User } from '../../../entities';
import {
  CreateReservationResponse,
  ICreateReservationResponse,
} from '../reservation/create-reservation.response';

export interface ICreateUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: ICreateReservationResponse[];
}

export class CreateUserResponse implements ICreateUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: CreateReservationResponse[];

  constructor(props: ICreateUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.reservations = props.reservations;
  }

  static fromEntity(user: User): CreateUserResponse {
    return new CreateUserResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
      reservations: user.reservations?.map((reservation) =>
        CreateReservationResponse.fromEntity(reservation),
      ),
    });
  }
}
