import { Reservation } from './reservation.entity';
import * as bcrypt from 'bcrypt';
export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  reservations?: Reservation[];
}

export class User implements IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  reservations?: Reservation[];

  private constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.reservations = user.reservations;
  }

  async encryptPassword(): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }

  public static async create(props: IUser): Promise<User> {
    if (!props.password || props.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(props.password, saltRounds);

    const userWithHashedPassword = {
      ...props,
      password: hashedPassword,
    };

    return new User(userWithHashedPassword);
  }
}
