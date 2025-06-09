import { NotFoundException } from '@nestjs/common';
import { CarRepository } from 'src/repositories';

export interface SearchCarUseCaseProps {
  name?: string;
  mark?: string;
  year?: number;
  price?: number;
  page?: number;
  pageSize?: number;
}

export class SearchCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(searchCarUseCaseProps: SearchCarUseCaseProps) {
    const {
      name,
      mark,
      year,
      price,
      page = 1,
      pageSize = 10,
    } = searchCarUseCaseProps;

    const cars = await this.carRepository.search({
      name,
      mark,
      year,
      price,
      page,
      pageSize,
    });

    if (!cars.data || cars.data.length === 0) {
      throw new NotFoundException(
        'No cars found matching the search criteria.',
      );
    }

    return cars;
  }
}
