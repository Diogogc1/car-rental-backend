import { NotFoundException } from '@nestjs/common';
import { GetAllCarResponse, IGetAllCarPayload } from 'src/dtos';
import { CarRepository } from 'src/repositories';

export class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    params: IGetAllCarPayload,
  ): Promise<{ data: GetAllCarResponse[]; total: number }> {
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

    return {
      data: cars.data.map((car) => GetAllCarResponse.fromEntity(car)),
      total: cars.total,
    };
  }
}
