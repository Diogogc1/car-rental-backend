import { CarStatusPrisma } from 'generated/prisma';
import { Reservation } from './reservation.entity';

export interface ICar {
  id?: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];
}

export class Car implements ICar {
  id?: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];

  constructor(car: ICar) {
    this.id = car.id;
    this.name = car.name;
    this.brand = car.brand;
    this.year = car.year;
    this.price = car.price;
    this.status = car.status;
    this.reservations = car.reservations;
  }

  isAvailable(startDate: Date, endDate: Date): boolean {
    if (
      !this.reservations ||
      this.reservations.length < 0 ||
      this.status === CarStatusPrisma.RESERVED
    ) {
      return false;
    }

    return !this.reservations.some(
      (reservation) =>
        (startDate >= reservation.startDate &&
          startDate < reservation.endDate) ||
        (endDate > reservation.startDate && endDate <= reservation.endDate) ||
        (startDate < reservation.startDate && endDate > reservation.endDate),
    );
  }
}
