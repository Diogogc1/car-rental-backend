import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { UpdateCarByIdResponse } from '../dtos/responses';
import { IUpdateCarByIdPayload } from '../interfaces/dtos/payloads';
import { CarRepository } from '../repositories';

@Injectable()
export class UpdateCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    id: number,
    dataUpdate: IUpdateCarByIdPayload,
  ): Promise<Result<UpdateCarByIdResponse>> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    car.update(dataUpdate);

    await this.carRepository.update(id, dataUpdate);

    const response = UpdateCarByIdResponse.fromEntity(car);
    return Result.success(response);
  }
}
