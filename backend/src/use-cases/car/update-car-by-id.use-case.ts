import { Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateCarByIdPayload, UpdateCarByIdResponse } from 'src/dtos';
import { CarRepository } from 'src/repositories';

@Injectable()
export class UpdateCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(params: IUpdateCarByIdPayload) {
    const { id, ...dataUpdate } = params;

    const car = await this.carRepository.findById(Number(id));
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    car.update(dataUpdate);

    const updatedCar = await this.carRepository.update(car);
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
    return UpdateCarByIdResponse.fromEntity(updatedCar);
  }
}
