import { HttpStatus, Injectable } from '@nestjs/common';
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
      return Result.fail({
        message: 'No cars found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = {
      data: cars.data.map((car) => GetAllCarResponse.fromEntity(car)),
      total: cars.total,
    };

    return Result.success(response);
  }
}
