import {
  CarPrisma,
  CarStatusPrisma,
  ReservationPrisma,
} from 'generated/prisma';
import { CarResponse, ICarResponse } from 'src/dtos';
import { Car, ICar } from 'src/entities';
import { ReservationMapper } from './reservation.mapper';

export class CarMapper {
  static toEntity(
    carPrisma: CarPrisma & { reservations?: ReservationPrisma[] },
  ): Car {
    const carProps: ICar = {
      id: carPrisma.id,
      mark: carPrisma.mark,
      year: carPrisma.year,
      price: carPrisma.price,
      status: carPrisma.status,
      reservations: carPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    };
    return new Car(carProps);
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

  static toResponseDto(car: Car): CarResponse {
    const carProps: ICarResponse = {
      id: car.id!,
      mark: car.mark,
      year: car.year,
      price: car.price,
      status: car.status,
      reservations: car.reservations?.map((reservation) =>
        ReservationMapper.toResponseDto(reservation),
      ),
    };
    return new CarResponse(carProps);
  }
}
