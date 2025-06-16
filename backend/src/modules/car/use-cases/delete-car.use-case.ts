import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteCarByIdResponse } from '../dtos/responses';
import { CarRepository } from '../repositories';

@Injectable()
export class DeleteCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: number) {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    await this.carRepository.delete(id);

    return DeleteCarByIdResponse.fromEntity(car);
  }
}
