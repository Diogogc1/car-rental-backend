import { NotFoundException } from '@nestjs/common';
import { GetCarByIdResponse } from 'src/dtos';
import { CarRepository } from 'src/repositories';

export class GetCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(carId: number) {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return GetCarByIdResponse.fromEntity(car);
  }
}
