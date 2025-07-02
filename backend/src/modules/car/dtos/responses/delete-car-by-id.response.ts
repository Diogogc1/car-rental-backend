import { Car } from '../../entities';
import { IDeleteCarByIdResponse } from '../../interfaces/dtos/responses';

export class DeleteCarByIdResponse implements IDeleteCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;

  constructor(props: IDeleteCarByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.plate = props.plate;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
  }

  static fromEntity(car: Car): DeleteCarByIdResponse {
    return new DeleteCarByIdResponse({
      id: car.id!,
      name: car.name,
      plate: car.plate,
      brand: car.brand,
      year: car.year,
      price: car.price,
      imageUrl: car.imageUrl,
    });
  }
}
