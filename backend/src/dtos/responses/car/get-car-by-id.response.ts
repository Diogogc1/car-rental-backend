import { Car } from '../../../entities';
import {
  GetReservationByIdResponse,
  IGetReservationByIdResponse,
} from '../reservation/get-reservation-by-id.response';

export interface IGetCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IGetReservationByIdResponse[];
}

export class GetCarByIdResponse implements IGetCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: GetReservationByIdResponse[];

  constructor(carResponse: IGetCarByIdResponse) {
    this.id = carResponse.id;
    this.name = carResponse.name;
    this.brand = carResponse.brand;
    this.year = carResponse.year;
    this.price = carResponse.price;
    this.status = carResponse.status;
    this.reservations = carResponse.reservations;
  }

  static fromEntity(car: Car): GetCarByIdResponse {
    return new GetCarByIdResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        GetReservationByIdResponse.fromEntity(reservation),
      ),
    });
  }
}
