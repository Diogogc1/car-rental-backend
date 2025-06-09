import { Reservation } from 'src/entities';
import { prisma } from './prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ReservationMapper } from 'src/mappers';

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
    const reservationPrisma = await prisma.reservationPrisma.findFirst({
      where: { id, deletedAt: null },
    });

    if (!reservationPrisma) {
      return null;
    }

    return ReservationMapper.toEntity(reservationPrisma);
  }

  async findAll(page?: number, pageSize?: number): Promise<Reservation[]> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize;

    const reservationsPrisma = await prisma.reservationPrisma.findMany({
      where: { deletedAt: null },
      skip,
      take,
    });

    return reservationsPrisma.map((reservationPrisma) =>
      ReservationMapper.toEntity(reservationPrisma),
    );
  }

  async update(
    id: number,
    reservation: Reservation,
  ): Promise<Reservation | null> {
    try {
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

      return ReservationMapper.toEntity(reservationPrisma);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void | null> {
    try {
      await prisma.reservationPrisma.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }
}
