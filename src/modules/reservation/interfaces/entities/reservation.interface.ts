import { ICar } from 'src/modules/car/interfaces/entities';
import { IUser } from 'src/modules/user/interfaces/entities/user-entity.interface';

export interface IReservation {
  id?: number;
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;
  car?: ICar;
  user?: IUser;
}
