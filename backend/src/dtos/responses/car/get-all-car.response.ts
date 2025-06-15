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

  constructor(props: IGetAllCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
    this.reservations = props.reservations;
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
