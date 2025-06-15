import * as bcrypt from 'bcrypt';
import { Reservation } from './reservation.entity';
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

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.reservations = user.reservations;
  }

  update({ name, email }: Partial<IUser>): void {
    if (name) {
      this.name = name;
    }
    if (email) {
      this.email = email;
    }
  }

  async encryptPassword(): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }

  public static async createWithEncryptedPassword(props: IUser): Promise<User> {
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

  public async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
