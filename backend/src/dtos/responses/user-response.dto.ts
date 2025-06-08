import { ReservationResponseDto } from './reservation-response.dto';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponseDto[];

  constructor(userResponseDto: UserResponseDto) {
    this.id = userResponseDto.id;
    this.name = userResponseDto.name;
    this.email = userResponseDto.email;
    this.reservations = userResponseDto.reservations;
  }
}
