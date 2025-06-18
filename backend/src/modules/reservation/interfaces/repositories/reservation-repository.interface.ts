import { Reservation } from '../../entities';
import { IReservation } from '../entities';

export interface IReservationRepository {
  create(reservation: IReservation): Promise<Reservation>;
  findById(id: number): Promise<Reservation | null>;
  findAll(page?: number, pageSize?: number): Promise<Reservation[]>;
  update(reservation: IReservation): Promise<Reservation>;
  delete(id: number): Promise<Reservation>;
}
