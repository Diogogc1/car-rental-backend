import { GetReservationByIdResponse } from 'src/modules/reservation/dtos/responses';
import { Car } from '../../entities';
import { IGetCarByIdResponse } from '../../interfaces/dtos/responses';

export class GetCarByIdResponse implements IGetCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  reservations?: GetReservationByIdResponse[];

  constructor(props: IGetCarByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.plate = props.plate;
    this.imageUrl = props.imageUrl;
    this.reservations = props.reservations;
  }

  static fromEntity(car: Car): GetCarByIdResponse {
    return new GetCarByIdResponse({
      id: car.id!,
      name: car.name,
      plate: car.plate,
      brand: car.brand,
      year: car.year,
      price: car.price,
      imageUrl: car.imageUrl,
      reservations: car.reservations?.map((reservation) =>
        GetReservationByIdResponse.fromEntity(reservation),
      ),
    });
  }
}
