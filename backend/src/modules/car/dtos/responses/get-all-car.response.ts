import { GetAllReservationResponse } from '../../../reservation/dtos/responses/get-all-reservation.response';
import { Car } from '../../entities';
import { IGetAllCarResponse } from '../../interfaces/dtos/responses';

export class GetAllCarResponse implements IGetAllCarResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  reservations?: GetAllReservationResponse[];

  constructor(props: IGetAllCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.plate = props.plate;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.reservations = props.reservations;
  }

  static fromEntity(car: Car): GetAllCarResponse {
    return new GetAllCarResponse({
      id: car.id!,
      name: car.name,
      plate: car.plate,
      brand: car.brand,
      year: car.year,
      price: car.price,
      imageUrl: car.imageUrl,
      reservations: car.reservations?.map((reservation) =>
        GetAllReservationResponse.fromEntity(reservation),
      ),
    });
  }
}
