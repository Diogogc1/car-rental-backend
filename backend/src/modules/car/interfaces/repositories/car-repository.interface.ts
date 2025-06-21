import { Car } from '../../entities';
import { IGetAllCarPayload } from '../dtos/payloads';
import { ICar } from '../entities';

export interface ICarRepository {
  persist(car: ICar): Promise<Car>;
  findById(id: number): Promise<Car | null>;
  findAll(params: IGetAllCarPayload): Promise<{ data: Car[]; total: number }>;
  update(car: ICar): Promise<Car>;
  delete(id: number): Promise<Car>;
}
