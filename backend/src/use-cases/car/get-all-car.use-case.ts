import { NotFoundException } from '@nestjs/common';
import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';

export class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(page?: number, pageSize?: number): Promise<Car[]> {
    const cars = await this.carRepository.findAll(page, pageSize);

    if (!cars || cars.length === 0) {
      throw new NotFoundException('No cars found');
    }

    return cars;
  }
}
