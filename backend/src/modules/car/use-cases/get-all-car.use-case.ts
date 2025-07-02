import { Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { GetAllCarResponse } from '../dtos/responses';
import { IGetAllCarPayload } from '../interfaces/dtos/payloads';
import { CarRepository } from '../repositories';

@Injectable()
export class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    params: IGetAllCarPayload,
  ): Promise<Result<{ data: GetAllCarResponse[]; total: number }>> {
    const cars = await this.carRepository.findAll(params);

    if (!cars || cars.data.length === 0) {
      return Result.success({
        data: [],
        total: 0,
      });
    }

    const response = {
      data: cars.data.map((car) => GetAllCarResponse.fromEntity(car)),
      total: cars.total,
    };

    return Result.success(response);
  }
}
