import { CarStatusPrisma } from 'generated/prisma';

export interface ICreateCarResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
