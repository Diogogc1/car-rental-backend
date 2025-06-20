import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { DeleteCarByIdResponse } from '../dtos/responses';
import { CarRepository } from '../repositories';

@Injectable()
export class DeleteCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: number): Promise<Result<DeleteCarByIdResponse>> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    await this.carRepository.delete(id);

    const response = DeleteCarByIdResponse.fromEntity(car);
    return Result.success(response);
  }
}
