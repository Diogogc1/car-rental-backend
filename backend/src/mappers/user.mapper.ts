import { ReservationPrisma, UserPrisma } from 'generated/prisma';
import { UserResponseDto } from 'src/dtos';
import { User } from 'src/entities';
import { ReservationMapper } from './reservation.mapper';

export class UserMapper {
  static toEntity(
    userPrisma: UserPrisma & { reservations?: ReservationPrisma[] },
  ): User {
    return new User(
      userPrisma.id,
      userPrisma.name,
      userPrisma.email,
      userPrisma.password,
      userPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    );
  }

  static toPrismaModel(user: User): {
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

  static toResponseDto(
    user: User & { reservations?: ReservationPrisma[] },
  ): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.name,
      user.email,
      user.reservations?.map((reservation) =>
        ReservationMapper.toResponseDto(reservation),
      ),
    );
  }
}
