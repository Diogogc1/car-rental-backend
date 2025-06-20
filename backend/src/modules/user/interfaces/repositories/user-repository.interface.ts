import { User } from '../../entities/user.entity';
import { IUser } from '../entities';

export interface IUserRepository {
  persist(user: IUser): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: IUser): Promise<User>;
  delete(id: number): Promise<User>;
}
