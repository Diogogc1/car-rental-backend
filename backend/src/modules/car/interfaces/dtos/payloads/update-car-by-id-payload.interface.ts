import { CarStatusPrisma } from 'generated/prisma';

export interface IUpdateCarByIdPayload {
  id: number;
  plate?: string;
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
  imageUrl?: string;
  status?: CarStatusPrisma;
}
