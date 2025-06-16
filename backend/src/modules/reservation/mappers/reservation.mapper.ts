import { ReservationPrisma } from 'generated/prisma';
import { Reservation } from '../entities';
import { IReservation } from '../interfaces/entities';

export class ReservationMapper {
  static toEntity(reservationPrisma: ReservationPrisma): Reservation {
    const reservationProps: IReservation = {
      id: reservationPrisma.id,
      startDate: reservationPrisma.startDate,
      endDate: reservationPrisma.endDate,
      carId: reservationPrisma.carId,
      userId: reservationPrisma.userId,
      totalPrice: reservationPrisma.totalPrice,
    };
    return new Reservation(reservationProps);
  }

  static toPrismaModel(reservation: IReservation): {
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
