import { Reservation } from '../../entities';
import { IReservation } from '../entities';

export interface IReservationRepository {
  persist(reservation: IReservation): Promise<Reservation>;
  findById(id: number): Promise<Reservation | null>;
  findByUserId(userId: number): Promise<Reservation[]>;
  findByCarId(carId: number): Promise<Reservation[]>;
  findMany(page?: number, pageSize?: number): Promise<Reservation[]>;
  update(id: number, dataUpdate: Partial<IReservation>): Promise<Reservation>;
  delete(id: number): Promise<Reservation>;
}
