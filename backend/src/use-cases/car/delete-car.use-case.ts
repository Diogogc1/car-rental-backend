import { CarRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class DeleteCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: number): Promise<void> {
    const hasDeleted = await this.carRepository.delete(id);

    if (!hasDeleted) {
      throw new NotFoundException('Car not found');
    }

    return;
  }
}
