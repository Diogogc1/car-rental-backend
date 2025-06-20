import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { UpdateCarByIdResponse } from '../dtos/responses';
import { IUpdateCarByIdPayload } from '../interfaces/dtos/payloads';
import { CarRepository } from '../repositories';

@Injectable()
export class UpdateCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    params: IUpdateCarByIdPayload,
  ): Promise<Result<UpdateCarByIdResponse>> {
    const { id, ...dataUpdate } = params;

    const car = await this.carRepository.findById(Number(id));
    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    car.update(dataUpdate);

    await this.carRepository.update(car);

    const response = UpdateCarByIdResponse.fromEntity(car);
    return Result.success(response);
  }
}
