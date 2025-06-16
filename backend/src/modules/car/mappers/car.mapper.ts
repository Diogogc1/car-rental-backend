import {
  CarPrisma,
  CarStatusPrisma,
  ReservationPrisma,
} from 'generated/prisma';
import { ReservationMapper } from 'src/modules/reservation/mappers';
import { Car } from '../entities';
import { ICar } from '../interfaces/entities';

export class CarMapper {
  static toEntity(
    carPrisma: CarPrisma & { reservations?: ReservationPrisma[] },
  ): Car {
    const carProps: ICar = {
      id: carPrisma.id,
      name: carPrisma.name,
      brand: carPrisma.brand,
      year: carPrisma.year,
      price: carPrisma.price,
      status: carPrisma.status,
      reservations: carPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    };
    return new Car(carProps);
  }

  static toPrismaModel(car: ICar): {
    name: string;
    brand: string;
    year: number;
    price: number;
    status: CarStatusPrisma;
  } {
    return {
      name: car.name,
      brand: car.brand,
      year: car.year,
      price: car.price,
      status: car.status,
    };
  }
}
