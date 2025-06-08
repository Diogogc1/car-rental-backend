import { CarStatus } from 'generated/prisma';

export class Car {
  make: string;
  year: number;
  price: number;
  status: CarStatus;
}
