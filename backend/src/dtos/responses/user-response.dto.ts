import { ReservationResponseDto } from './reservation-response.dto';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponseDto[];

  constructor(
    id: number,
    name: string,
    email: string,
    reservations?: ReservationResponseDto[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.reservations = reservations;
  }
}
