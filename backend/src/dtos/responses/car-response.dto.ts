import { ReservationResponseDto } from './reservation-response.dto';

export class CarResponseDto {
  id: number;
  mark: string;
  year: number;
  price: number;
  status: string;
  reservations?: ReservationResponseDto[];

  constructor(car: CarResponseDto) {
    this.id = car.id;
    this.mark = car.mark;
    this.year = car.year;
    this.price = car.price;
    this.status = car.status;
    this.reservations = car.reservations;
  }
}
