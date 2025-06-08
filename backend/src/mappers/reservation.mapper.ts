import { ReservationPrisma } from 'generated/prisma';
import { ReservationResponseDto } from 'src/dtos';
import { Reservation } from 'src/entities';

export class ReservationMapper {
  static toEntity(reservationPrisma: ReservationPrisma): Reservation {
    return new Reservation(
      reservationPrisma.id,
      reservationPrisma.startDate,
      reservationPrisma.endDate,
      reservationPrisma.carId,
      reservationPrisma.userId,
      reservationPrisma.totalPrice,
    );
  }

  static toPrismaModel(reservation: Reservation): {
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

  static toResponseDto(reservation: Reservation): ReservationResponseDto {
    return new ReservationResponseDto(
      reservation.id,
      reservation.userId,
      reservation.carId,
      reservation.startDate,
      reservation.endDate,
    );
  }
}
