import { Reservation } from 'src/entities';
import { prisma } from './prisma';
import { ReservationMapper } from 'src/mappers/reservation.mapper';

export class ReservationRepository {
  async create(reservation: Reservation): Promise<Reservation> {
    const reservationPrisma = await prisma.reservationPrisma.create({
      data: {
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        carId: reservation.carId,
        userId: reservation.userId,
        totalPrice: reservation.totalPrice,
      },
    });

    return ReservationMapper.toEntity(reservationPrisma);
  }

  async findById(id: number): Promise<Reservation | null> {
    const reservationPrisma = await prisma.reservationPrisma.findUnique({
      where: { id },
    });

    if (!reservationPrisma) {
      return null;
    }

    return ReservationMapper.toEntity(reservationPrisma);
  }

  async update(
    id: number,
    reservation: Reservation,
  ): Promise<Reservation | null> {
    const reservationPrisma = await prisma.reservationPrisma.update({
      where: { id },
      data: {
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        carId: reservation.carId,
        userId: reservation.userId,
        totalPrice: reservation.totalPrice,
      },
    });

    if (!reservationPrisma) {
      return null;
    }

    return ReservationMapper.toEntity(reservationPrisma);
  }

  async delete(id: number): Promise<void> {
    await prisma.reservationPrisma.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
