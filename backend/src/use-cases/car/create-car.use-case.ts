import { CarStatusPrisma } from 'generated/prisma';
import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';

interface ICreateCarUseCaseParams {
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}

export class CreateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(params: ICreateCarUseCaseParams) {
    const { name, brand, year, price, status } = params;

    const car = new Car({
      name,
      brand,
      year,
      price,
      status,
    });

    const newCar = await this.carRepository.create(car);
    return newCar;
  }
}
