import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { GetCarByIdResponse } from '../dtos/responses';
import { CarRepository } from '../repositories';

@Injectable()
export class GetCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(carId: number): Promise<Result<GetCarByIdResponse>> {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = GetCarByIdResponse.fromEntity(car);

    return Result.success(response);
  }
}
