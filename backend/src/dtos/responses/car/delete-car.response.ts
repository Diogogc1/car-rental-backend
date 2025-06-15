import { Car } from '../../../entities';
import {
  DeleteReservationResponse,
  IDeleteReservationResponse,
} from '../reservation/delete-reservation.response';

export interface IDeleteCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IDeleteReservationResponse[];
}

export class DeleteCarResponse implements IDeleteCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: DeleteReservationResponse[];

  constructor(props: IDeleteCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
    this.reservations = props.reservations;
  }

  static fromEntity(car: Car): DeleteCarResponse {
    return new DeleteCarResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        DeleteReservationResponse.fromEntity(reservation),
      ),
    });
  }
}
