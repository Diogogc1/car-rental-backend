import { NotFoundException } from '@nestjs/common';
import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';

export interface GetAllCarUseCaseProps {
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
  page?: number;
  pageSize?: number;
}

export class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    params: GetAllCarUseCaseProps,
  ): Promise<{ data: Car[]; total: number }> {
    const { name, brand, year, price, page = 1, pageSize = 10 } = params;

    const cars = await this.carRepository.findAll({
      name,
      brand: brand,
      year,
      price,
      page,
      pageSize,
    });

    if (!cars || cars.data.length === 0) {
      throw new NotFoundException('No cars found');
    }

    return cars;
  }
}
