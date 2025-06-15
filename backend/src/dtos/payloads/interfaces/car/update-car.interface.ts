import { CarStatusPrisma } from 'generated/prisma';

export interface IUpdateCarByIdPayload {
  id: string;
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
  status?: CarStatusPrisma;
}
