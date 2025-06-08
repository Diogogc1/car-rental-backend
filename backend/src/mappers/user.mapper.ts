import { ReservationPrisma, UserPrisma } from 'generated/prisma';
import { UserResponseDto } from 'src/dtos';
import { User } from 'src/entities';
import { ReservationMapper } from './reservation.mapper';

export class UserMapper {
  static toEntity(
    userPrisma: UserPrisma & { reservations?: ReservationPrisma[] },
  ): User {
    return new User({
      id: userPrisma.id,
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
      reservations: userPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    });
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
    return new UserResponseDto({
      id: user.id!,
      name: user.name,
      email: user.email,
      reservations: user.reservations?.map((reservation) =>
        ReservationMapper.toResponseDto(reservation),
      ),
    });
  }
}
