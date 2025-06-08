import { NotFoundException } from '@nestjs/common';
import { CarRepository } from 'src/repositories';

export class GetAllCarsUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute() {
    const cars = await this.carRepository.findAll();

    if (!cars || cars.length === 0) {
      throw new NotFoundException('No cars found');
    }

    return cars;
  }
}
