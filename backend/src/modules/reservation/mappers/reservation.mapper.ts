import { ReservationPrisma } from 'generated/prisma';
import { Reservation } from '../entities';
import { IReservation } from '../interfaces/entities';

export class ReservationMapper {
  static toEntity(reservationPersistence: ReservationPrisma): Reservation {
    const reservationProps: IReservation = {
      id: reservationPersistence.id,
      startDate: reservationPersistence.startDate,
      endDate: reservationPersistence.endDate,
      carId: reservationPersistence.carId,
      userId: reservationPersistence.userId,
      totalPrice: reservationPersistence.totalPrice,
    };
    return new Reservation(reservationProps);
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
