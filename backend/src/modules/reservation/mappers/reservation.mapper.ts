import { CarPrisma, ReservationPrisma } from 'generated/prisma';
import { Reservation } from '../entities';
import { IReservation } from '../interfaces/entities';

export class ReservationMapper {
  static toEntity(
    reservationPersistence: ReservationPrisma & { car?: CarPrisma },
  ): Reservation {
    const reservationProps: IReservation = {
      id: reservationPersistence.id,
      startDate: reservationPersistence.startDate,
      endDate: reservationPersistence.endDate,
      carId: reservationPersistence.carId,
      userId: reservationPersistence.userId,
      totalPrice: reservationPersistence.totalPrice,
      car: reservationPersistence.car ?? undefined,
    };

    const reservation = new Reservation(reservationProps);

    return reservation;
  }

  static toPersistence(reservation: IReservation): {
    startDate: Date;
    endDate: Date;
    carId: number;
    userId: number;
    totalPrice: number;
  } {
    return {
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      carId: reservation.carId,
      userId: reservation.userId,
      totalPrice: reservation.totalPrice,
    };
  }
}
