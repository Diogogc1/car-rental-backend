import { CreateCarResponse, ICreateCarPayload } from 'src/dtos';
import { Car } from 'src/entities';
import { CarRepository } from 'src/repositories';

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
