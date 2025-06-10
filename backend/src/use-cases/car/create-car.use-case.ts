import { CarStatusPrisma } from 'generated/prisma';
import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';

interface ICreateCarUseCaseProps {
  name: string;
  mark: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
}

export class CreateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(createCarUseCaseProps: ICreateCarUseCaseProps) {
    const { name, mark, year, price, status } = createCarUseCaseProps;

    const car = new Car({
      name,
      mark,
      year,
      price,
      status,
    });

    const newCar = await this.carRepository.create(car);
    return newCar;
  }
}
