import { CarStatusPrisma } from 'generated/prisma';

export interface IUpdateCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}
