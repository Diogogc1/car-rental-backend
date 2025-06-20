import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { prisma } from '../../../shared/utils/prisma';
import { Car } from '../entities';
import { ICar } from '../interfaces/entities';
import { ICarRepository, IGetAllCarParams } from '../interfaces/repositories';
import { CarMapper } from '../mappers';

@Injectable()
export class CarRepository implements ICarRepository {
  async create(car: ICar): Promise<Car> {
    const carPrisma = await prisma.carPrisma.create({
      data: {
        name: car.name,
        plate: car.plate,
        brand: car.brand,
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
    params: IGetAllCarParams,
  ): Promise<{ data: Car[]; total: number }> {
    const { name, brand, year, price, page, pageSize } = params;

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
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          reservations: true,
        },
      }),
    ]);

    const cars = carsPrisma.map((carPrisma) => CarMapper.toEntity(carPrisma));

    return { data: cars, total };
  }

  async update(car: ICar): Promise<Car> {
    const carPrisma = await prisma.carPrisma.update({
      where: { id: car.id },
      data: CarMapper.toPrismaModel(car),
      include: {
        reservations: true,
      },
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
