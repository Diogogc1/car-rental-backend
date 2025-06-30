import { CarStatusPrisma } from 'generated/prisma';

export interface ICreateCarPayload {
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  status: CarStatusPrisma;
}
