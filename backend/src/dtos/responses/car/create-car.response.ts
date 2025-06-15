import { Car } from '../../../entities';
import {
  CreateReservationResponse,
  ICreateReservationResponse,
} from '../reservation/create-reservation.response';

export interface ICreateCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: ICreateReservationResponse[];
}

export class CreateCarResponse implements ICreateCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: CreateReservationResponse[];

  constructor(props: ICreateCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
    this.reservations = props.reservations;
  }

  static fromEntity(car: Car): CreateCarResponse {
    return new CreateCarResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        CreateReservationResponse.fromEntity(reservation),
      ),
    });
  }
}
