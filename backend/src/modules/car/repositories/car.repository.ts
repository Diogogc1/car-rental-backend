import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { prisma } from '../../../shared/utils/prisma';
import { Car } from '../entities';
import {
  IGetAllCarPayload,
  IUpdateCarByIdPayload,
} from '../interfaces/dtos/payloads';
import { ICar } from '../interfaces/entities';
import { ICarRepository } from '../interfaces/repositories';
import { CarMapper } from '../mappers';

@Injectable()
export class CarRepository implements ICarRepository {
  async persist(car: ICar): Promise<Car> {
    const carPersistence = CarMapper.toPersistence(car);
    const carPrisma = await prisma.carPrisma.create({
      data: {
        ...carPersistence,
      },
    });

    return CarMapper.toEntity(carPrisma);
  }

  async findById(id: number): Promise<Car | null> {
    const carPrisma = await prisma.carPrisma.findFirst({
      where: { id, deletedAt: null },
      include: {
        reservations: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!carPrisma) {
      return null;
    }

    return CarMapper.toEntity(carPrisma);
  }

  async verifyIfExistsByParams({
    name,
    brand,
    year,
    price,
  }: {
    name: string;
    brand: string;
    year: number;
    price: number;
  }): Promise<boolean> {
    const car = await prisma.carPrisma.findFirst({
      where: {
        name,
        brand,
        year,
        price,
        deletedAt: null,
      },
    });
    return !!car;
  }

  async findAll(
    params: IGetAllCarPayload,
  ): Promise<{ data: Car[]; total: number }> {
    const { name, brand, year, price, page, limit } = params;

    const where: Prisma.CarPrismaWhereInput = {
      deletedAt: null,
    };

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (brand) {
      where.brand = {
        contains: brand,
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
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          reservations: {
            where: {
              deletedAt: null,
            },
          },
        },
      }),
    ]);

    const cars = carsPrisma.map((carPrisma) => CarMapper.toEntity(carPrisma));

    return { data: cars, total };
  }

  async update(
    id: number,
    dataUpdate: Omit<IUpdateCarByIdPayload, 'id'>,
  ): Promise<Car> {
    const carPrisma = await prisma.carPrisma.update({
      where: { id: id },
      data: dataUpdate,
    });

    return CarMapper.toEntity(carPrisma);
  }

  async delete(id: number): Promise<Car> {
    const car = await prisma.carPrisma.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return CarMapper.toEntity(car);
  }
}
