import { Injectable } from '@nestjs/common';
import { prisma } from '../../../shared/utils/prisma';
import { Reservation } from '../entities';
import { IReservation } from '../interfaces/entities';
import { IReservationRepository } from '../interfaces/repositories';
import { ReservationMapper } from '../mappers';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  async persist(reservation: IReservation): Promise<Reservation> {
    const reservationPersistence = ReservationMapper.toPersistence(reservation);
    const reservationPrisma = await prisma.reservationPrisma.create({
      data: {
        ...reservationPersistence,
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
    dataUpdate: Partial<Omit<IReservation, 'id'>>,
  ): Promise<Reservation> {
    const reservationPrisma = await prisma.reservationPrisma.update({
      where: { id: id },
      data: dataUpdate,
    });

    return ReservationMapper.toEntity(reservationPrisma);
  }

  async delete(id: number): Promise<Reservation> {
    const reservation = await prisma.reservationPrisma.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return ReservationMapper.toEntity(reservation);
  }
}
