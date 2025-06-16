import { CarStatusPrisma } from 'generated/prisma';

export interface IDeleteCarByIdResponse {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
