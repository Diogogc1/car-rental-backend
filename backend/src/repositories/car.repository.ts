import { Car } from 'src/entities';
import { prisma } from './prisma';
import { CarMapper } from 'src/mappers/car.mapper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class CarRepository {
  async create(car: Car): Promise<Car> {
    const carPrisma = await prisma.carPrisma.create({
      data: {
        mark: car.mark,
        year: car.year,
        price: car.price,
      },
      include: {
        reservations: true,
      },
    });

    return CarMapper.toEntity(carPrisma);
  }

  async findById(id: number): Promise<Car | null> {
    const carPrisma = await prisma.carPrisma.findFirst({
      where: { id, deletedAt: null },
      include: {
        reservations: true,
      },
    });

    if (!carPrisma) {
      return null;
    }

    return CarMapper.toEntity(carPrisma);
  }

  async update(id: number, car: Car): Promise<Car | null> {
    try {
      const carPrisma = await prisma.carPrisma.update({
        where: { id },
        data: CarMapper.toPrismaModel(car),
        include: {
          reservations: true,
        },
      });

      return CarMapper.toEntity(carPrisma);
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
      await prisma.carPrisma.update({
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
