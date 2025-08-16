import * as bcrypt from 'bcrypt';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { IUser } from '../interfaces/entities';

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
    this.reservations = user.reservations?.map(
      (reservation) => new Reservation(reservation),
    );
  }

  update({ name, email }: Partial<IUser>): void {
    if (name) {
      this.name = name;
    }
    if (email) {
      this.email = email;
    }
  }

  private async encryptPassword(): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }

  public static async createWithEncryptedPassword(props: IUser): Promise<User> {
    const newUser = new User(props);
    await newUser.encryptPassword();

    return newUser;
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
