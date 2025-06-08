import {
  CarPrisma,
  CarStatusPrisma,
  ReservationPrisma,
} from 'generated/prisma';
import { CarResponseDto } from 'src/dtos';
import { Car } from 'src/entities';
import { ReservationMapper } from './reservation.mapper';

export class CarMapper {
  static toEntity(
    carPrisma: CarPrisma & { reservations?: ReservationPrisma[] },
  ): Car {
    return new Car({
      id: carPrisma.id,
      mark: carPrisma.mark,
      year: carPrisma.year,
      price: carPrisma.price,
      status: carPrisma.status,
      reservations: carPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    });
  }

  static toPrismaModel(car: Car): {
    mark: string;
    year: number;
    price: number;
    status: CarStatusPrisma;
  } {
    return {
      mark: car.mark,
      year: car.year,
      price: car.price,
      status: car.status,
    };
  }

  static toResponseDto(car: Car): CarResponseDto {
    return new CarResponseDto({
      id: car.id!,
      mark: car.mark,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        ReservationMapper.toResponseDto(reservation),
      ),
    });
  }
}
