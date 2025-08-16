import { User } from '../../entities/user.entity';
import { IUpdateUserByIdPayload } from '../dto/payloads';
import { IUser } from '../entities';

export interface IUserRepository {
  persist(user: IUser): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(
    id: number,
    user: Partial<Omit<IUpdateUserByIdPayload, 'id'>>,
  ): Promise<User>;
  delete(id: number): Promise<User>;
}
