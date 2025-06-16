import { Injectable } from '@nestjs/common';

import { CreateCarResponse } from '../dtos/responses';
import { Car } from '../entities';
import { ICreateCarPayload } from '../interfaces/dtos/payloads';
import { CarRepository } from '../repositories';

@Injectable()
export class CreateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(params: ICreateCarPayload) {
    const { name, brand, year, price, status } = params;

    const car = new Car({
      name,
      brand,
      year,
      price,
      status,
    });

    const newCar = await this.carRepository.create(car);
    return CreateCarResponse.fromEntity(newCar);
  }
}
