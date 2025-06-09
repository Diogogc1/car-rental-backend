import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

interface IUpdateCarUseCaseProps {
  id: number;
  name?: string;
  mark?: string;
  year?: number;
  price?: number;
  status?: string;
}

export class UpdateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute({ id, ...dataUpdate }: IUpdateCarUseCaseProps): Promise<Car> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    Object.assign(car, dataUpdate);

    const updatedCar = await this.carRepository.update(id, car);
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
    return updatedCar;
  }
}
