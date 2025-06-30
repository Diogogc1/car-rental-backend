import { CarStatusPrisma } from 'generated/prisma';

export interface ICreateCarResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  status: CarStatusPrisma;
}
