import { CarStatusPrisma } from 'generated/prisma';
import { Reservation } from './reservation.entity';

export interface ICar {
  id?: number;
  mark: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];
}

export class Car implements ICar {
  id?: number;
  mark: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];

  constructor(car: ICar) {
    this.id = car.id;
    this.mark = car.mark;
    this.year = car.year;
    this.price = car.price;
    this.status = car.status;
    this.reservations = car.reservations;
  }
}
