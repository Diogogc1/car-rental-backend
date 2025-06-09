import { Car } from 'src/entities';
import { prisma } from './prisma';
import { CarMapper } from 'src/mappers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from 'generated/prisma';

interface CarSearchProps {
  name?: string;
  mark?: string;
  year?: number;
  price?: number;
  page?: number;
  pageSize?: number;
}

export class CarRepository {
  async create(car: Car): Promise<Car> {
    const carPrisma = await prisma.carPrisma.create({
      data: {
        name: car.name,
        mark: car.mark,
        year: car.year,
        price: car.price,
        status: car.status,
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

  async findAll(page?: number, pageSize?: number): Promise<Car[]> {
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize;
    const carsPrisma = await prisma.carPrisma.findMany({
      where: { deletedAt: null },
      include: {
        reservations: true,
      },
      take: take,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    });

    return carsPrisma.map((carPrisma) => CarMapper.toEntity(carPrisma));
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

  async verifyIfReserved(
    id: number,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const carPrisma = await prisma.carPrisma.findFirst({
      where: {
        id,
        deletedAt: null,
        reservations: {
          some: {
            endDate: { gte: startDate },
            startDate: { lte: endDate },
          },
        },
      },
    });

    return !!carPrisma;
  }

  async search(props: CarSearchProps): Promise<{ data: Car[]; total: number }> {
    const { name, mark, year, price, page = 1, pageSize = 10 } = props;

    const where: Prisma.CarPrismaWhereInput = {
      deletedAt: null,
    };

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (mark) {
      where.mark = {
        contains: mark,
        mode: 'insensitive',
      };
    }

    if (year) {
      where.year = year;
    }

    if (price) {
      where.price = price;
    }

    const [total, carsPrisma] = await prisma.$transaction([
      prisma.carPrisma.count({ where }),
      prisma.carPrisma.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const cars = carsPrisma.map((carPrisma) => CarMapper.toEntity(carPrisma));

    return { data: cars, total };
  }
}
