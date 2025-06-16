import { CarStatusPrisma } from 'generated/prisma';
import { IReservation } from 'src/modules/reservation/interfaces/entities';

export interface ICar {
  id?: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: IReservation[];
}
