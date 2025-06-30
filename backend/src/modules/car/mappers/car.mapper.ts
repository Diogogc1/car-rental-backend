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
    carPersistence: CarPrisma & { reservations?: ReservationPrisma[] },
  ): Car {
    const carProps: ICar = {
      id: carPersistence.id,
      name: carPersistence.name,
      plate: carPersistence.plate,
      brand: carPersistence.brand,
      year: carPersistence.year,
      price: carPersistence.price,
      imageUrl: carPersistence.imageUrl,
      status: carPersistence.status,
      reservations: carPersistence.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    };
    return new Car(carProps);
  }

  static toPersistence(car: ICar): {
    name: string;
    plate: string;
    brand: string;
    year: number;
    price: number;
    imageUrl: string;
    status: CarStatusPrisma;
  } {
    return {
      name: car.name,
      plate: car.plate,
      brand: car.brand,
      year: car.year,
      price: car.price,
      imageUrl: car.imageUrl,
      status: car.status,
    };
  }
}
