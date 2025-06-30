import { CarStatusPrisma } from 'generated/prisma';
import { Reservation } from 'src/modules/reservation/entities';
import { ICar } from '../interfaces/entities';

export class Car implements ICar {
  id?: number;
  plate: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  status: CarStatusPrisma;
  reservations?: Reservation[];

  constructor(car: ICar) {
    this.id = car.id;
    this.name = car.name;
    this.plate = car.plate;
    this.brand = car.brand;
    this.year = car.year;
    this.price = car.price;
    this.imageUrl = car.imageUrl;
    this.status = car.status;
    this.reservations = car.reservations?.map(
      (reservation) => new Reservation(reservation),
    );
  }

  isAvailable(startDate: Date, endDate: Date): boolean {
    const dataIsValid = endDate > startDate;

    if (!dataIsValid) {
      throw new Error('End date must be after start date');
    }

    const hasReservations =
      this.reservations &&
      this.reservations.length > 0 &&
      this.status === CarStatusPrisma.RESERVED;

    return !hasReservations && dataIsValid;
  }

  reserve() {
    this.status = CarStatusPrisma.RESERVED;
  }

  update({
    name,
    plate,
    brand,
    year,
    price,
    imageUrl,
    status,
  }: Partial<ICar>): void {
    if (name !== undefined) {
      this.name = name;
    }
    if (plate !== undefined) {
      this.plate = plate;
    }
    if (brand !== undefined) {
      this.brand = brand;
    }
    if (year !== undefined) {
      this.year = year;
    }
    if (price !== undefined) {
      this.price = price;
    }
    if (imageUrl !== undefined) {
      this.imageUrl = imageUrl;
    }
    if (status !== undefined) {
      this.status = status;
    }
  }
}
