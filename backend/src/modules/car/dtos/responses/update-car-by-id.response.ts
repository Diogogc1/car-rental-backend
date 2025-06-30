import { CarStatusPrisma } from 'generated/prisma';
import { Car } from '../../entities';
import { IUpdateCarByIdResponse } from '../../interfaces/dtos/responses';

export class UpdateCarByIdResponse implements IUpdateCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  status: CarStatusPrisma;

  constructor(props: IUpdateCarByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.plate = props.plate;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.status = props.status;
  }

  static fromEntity(car: Car): UpdateCarByIdResponse {
    return new UpdateCarByIdResponse({
      id: car.id!,
      name: car.name,
      plate: car.plate,
      brand: car.brand,
      year: car.year,
      price: car.price,
      imageUrl: car.imageUrl,
      status: car.status,
    });
  }
}
