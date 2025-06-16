import { CarStatusPrisma } from 'generated/prisma';

export interface IUpdateCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
