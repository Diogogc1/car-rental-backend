import { HttpStatus, Injectable } from '@nestjs/common';

import { Result } from 'src/shared/utils';
import { CreateCarResponse } from '../dtos/responses';
import { Car } from '../entities';
import { ICreateCarPayload } from '../interfaces/dtos/payloads';
import { CarRepository } from '../repositories';

@Injectable()
export class CreateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(params: ICreateCarPayload): Promise<Result<CreateCarResponse>> {
    const { name, plate, brand, year, price, status } = params;

    const carExists = await this.carRepository.verifyIfExistsByParams({
      name,
      brand,
      year,
      price,
    });

    if (carExists) {
      return Result.fail({
        message: 'Car already exists with the same parameters',
        httpStatus: HttpStatus.CONFLICT,
      });
    }

    const car = new Car({
      name,
      plate,
      brand,
      year,
      price,
      status,
    });

    const newCar = await this.carRepository.persist(car);
    const response = CreateCarResponse.fromEntity(newCar);
    return Result.success(response);
  }
}
