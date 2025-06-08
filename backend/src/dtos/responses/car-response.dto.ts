import { ReservationResponseDto } from './reservation-response.dto';

export class CarResponseDto {
  id: number;
  mark: string;
  year: number;
  price: number;
  status: string;
  reservations?: ReservationResponseDto[];

  constructor(
    id: number,
    mark: string,
    year: number,
    price: number,
    status: string,
    reservations?: ReservationResponseDto[],
  ) {
    this.id = id;
    this.mark = mark;
    this.year = year;
    this.price = price;
    this.status = status;
    this.reservations = reservations;
  }
}
