import { ReservationPrisma } from 'generated/prisma';
import { ReservationResponseDto } from 'src/dtos';
import { Reservation } from 'src/entities';

export class ReservationMapper {
  static toEntity(reservationPrisma: ReservationPrisma): Reservation {
    return new Reservation({
      id: reservationPrisma.id,
      startDate: reservationPrisma.startDate,
      endDate: reservationPrisma.endDate,
      carId: reservationPrisma.carId,
      userId: reservationPrisma.userId,
      totalPrice: reservationPrisma.totalPrice,
    });
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
    return new ReservationResponseDto({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
    });
  }
}
