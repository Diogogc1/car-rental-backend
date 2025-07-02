import { ReservationPrisma, UserPrisma } from 'generated/prisma';
import { ReservationMapper } from '../../reservation/mappers/reservation.mapper';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/entities';

export class UserMapper {
  static toEntity(
    userPersistence: UserPrisma & { reservations?: ReservationPrisma[] },
  ): User {
    const userProps: IUser = {
      id: userPersistence.id,
      name: userPersistence.name,
      email: userPersistence.email,
      password: userPersistence.password,
      reservations: userPersistence.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    };
    return new User(userProps);
  }

  static toPrismaModel(user: IUser): {
    name: string;
    email: string;
    password: string;
  } {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
