import { CarStatus } from 'generated/prisma';

export class Car {
  mark: string;
  year: number;
  price: number;
  status: CarStatus;
}
