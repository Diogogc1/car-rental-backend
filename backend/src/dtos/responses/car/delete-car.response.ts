import { Car } from '../../../entities';
import { CarStatusPrisma } from 'generated/prisma';

export interface IDeleteCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}

export class DeleteCarResponse implements IDeleteCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;

  constructor(props: IDeleteCarResponse) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.year = props.year;
    this.price = props.price;
    this.status = props.status;
  }

  static fromEntity(car: Car): DeleteCarResponse {
    return new DeleteCarResponse({
      id: car.id!,
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
    });
  }
}
