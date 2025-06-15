import { ReservationPrisma } from 'generated/prisma';
import { IReservationResponse, ReservationResponse } from 'src/dtos';
import { IReservation, Reservation } from 'src/entities';

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

  static toResponseDto(reservation: Reservation): ReservationResponse {
    const reservationResponseProps: IReservationResponse = {
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
    };
    return new ReservationResponse(reservationResponseProps);
  }
}
