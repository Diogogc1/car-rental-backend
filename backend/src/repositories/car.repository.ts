import { Prisma } from 'generated/prisma';
import { Car } from 'src/entities';
import { CarMapper } from 'src/mappers';
import { prisma } from './prisma';

interface getAllCarParams {
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
  page: number;
  pageSize: number;
}

export class CarRepository {
  async create(car: Car): Promise<Car> {
    const carPrisma = await prisma.carPrisma.create({
      data: {
        name: car.name,
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

  async findAll(
    params: getAllCarParams,
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

  async update(car: Car): Promise<Car> {
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
