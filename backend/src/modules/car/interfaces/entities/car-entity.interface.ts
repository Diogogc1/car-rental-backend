import { IReservation } from 'src/modules/reservation/interfaces/entities';

export interface ICar {
  id?: number;
  plate: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  reservations?: IReservation[];
}
