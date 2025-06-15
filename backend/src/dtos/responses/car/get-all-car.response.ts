import { Car } from '../../../entities';
import {
  GetAllReservationResponse,
  IGetAllReservationResponse,
} from '../reservation/get-all-reservation.response';

export interface IGetAllCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IGetAllReservationResponse[];
}

export class GetAllCarResponse implements IGetAllCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: GetAllReservationResponse[];

  constructor(carResponse: IGetAllCarResponse) {
    this.id = carResponse.id;
    this.name = carResponse.name;
    this.brand = carResponse.brand;
    this.year = carResponse.year;
    this.price = carResponse.price;
    this.status = carResponse.status;
    this.reservations = carResponse.reservations;
  }

  static fromEntity(car: Car): GetAllCarResponse {
    return new GetAllCarResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        GetAllReservationResponse.fromEntity(reservation),
      ),
    });
  }
}
