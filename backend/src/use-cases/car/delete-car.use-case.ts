import { DeleteCarResponse } from 'src/dtos';
import { CarRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class DeleteCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: number) {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    await this.carRepository.delete(id);

    return DeleteCarResponse.fromEntity(car);
  }
}
