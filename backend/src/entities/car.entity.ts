import { CarStatusPrisma } from 'generated/prisma';
import { Reservation } from './reservation.entity';

export class Car {
  id?: number;
  mark: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];

  constructor(car: Car) {
    this.id = car.id;
    this.mark = car.mark;
    this.year = car.year;
    this.price = car.price;
    this.status = car.status;
    this.reservations = car.reservations;
  }
}
