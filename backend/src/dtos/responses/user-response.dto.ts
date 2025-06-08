import { ReservationResponse } from './reservation-response.dto';

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponse[];
}

export class UserResponse implements IUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponse[];

  constructor(userResponse: IUserResponse) {
    this.id = userResponse.id;
    this.name = userResponse.name;
    this.email = userResponse.email;
    this.reservations = userResponse.reservations;
  }
}
