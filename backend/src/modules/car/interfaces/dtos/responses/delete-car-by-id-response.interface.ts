import { CarStatusPrisma } from 'generated/prisma';

export interface IDeleteCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
