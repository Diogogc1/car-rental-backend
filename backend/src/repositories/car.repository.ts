import { Car } from 'src/entities';
import { prisma } from './prisma';
import { CarMapper } from 'src/mappers/car.mapper';

export class CarRepository {
  async create(car: Car): Promise<any> {
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
    const carPrisma = await prisma.carPrisma.findUnique({
      where: { id },
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
    const carPrisma = await prisma.carPrisma.update({
      where: { id },
      data: CarMapper.toPrismaModel(car),
      include: {
        reservations: true,
      },
    });

    if (!carPrisma) {
      return null;
    }

    return CarMapper.toEntity(carPrisma);
  }

  async delete(id: number): Promise<void> {
    await prisma.carPrisma.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
