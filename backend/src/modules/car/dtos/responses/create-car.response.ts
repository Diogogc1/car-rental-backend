import { CarStatusPrisma } from 'generated/prisma';
import { Car } from '../../entities';
import { ICreateCarResponse } from '../../interfaces/dtos/responses';

export class CreateCarResponse implements ICreateCarResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  status: CarStatusPrisma;

  constructor(props: ICreateCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.plate = props.plate;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.status = props.status;
  }

  static fromEntity(car: Car): CreateCarResponse {
    return new CreateCarResponse({
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
