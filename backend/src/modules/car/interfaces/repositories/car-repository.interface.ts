import { Car } from '../../entities';
import { ICar } from '../entities';
import { IGetAllCarParams } from './get-all-car-params.interface';

export interface ICarRepository {
  create(car: ICar): Promise<Car>;
  findById(id: number): Promise<Car | null>;
  findAll(params: IGetAllCarParams): Promise<{ data: Car[]; total: number }>;
  update(car: ICar): Promise<Car>;
  delete(id: number): Promise<Car>;
}
