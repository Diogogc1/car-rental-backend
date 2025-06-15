import { Car } from '../../../entities';
import {
  IUpdateReservationByIdResponse,
  UpdateReservationByIdResponse,
} from '../reservation/update-reservation-by-id.response';

export interface IUpdateCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IUpdateReservationByIdResponse[];
}

export class UpdateCarByIdResponse implements IUpdateCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: UpdateReservationByIdResponse[];

  constructor(props: IUpdateCarByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
    this.reservations = props.reservations;
  }

  static fromEntity(car: Car): UpdateCarByIdResponse {
    return new UpdateCarByIdResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        UpdateReservationByIdResponse.fromEntity(reservation),
      ),
    });
  }
}
