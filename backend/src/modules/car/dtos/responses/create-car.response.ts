import { CarStatusPrisma } from 'generated/prisma';
import { Car } from '../../entities';
import { ICreateCarResponse } from '../../interfaces/dtos/responses';

export class CreateCarResponse implements ICreateCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;

  constructor(props: ICreateCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
  }

  static fromEntity(car: Car): CreateCarResponse {
    return new CreateCarResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
    });
  }
}
