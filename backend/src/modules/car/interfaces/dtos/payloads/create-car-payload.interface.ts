import { CarStatusPrisma } from 'generated/prisma';

export interface ICreateCarPayload {
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
