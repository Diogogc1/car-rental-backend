import { Module } from '@nestjs/common';
import { CarController } from './modules/car/controllers/car.controller';
import { CarRepository } from './modules/car/repositories/car.repository';
import { CreateCarUseCase } from './modules/car/use-cases/create-car.use-case';
import { DeleteCarUseCase } from './modules/car/use-cases/delete-car.use-case';
import { GetAllCarUseCase } from './modules/car/use-cases/get-all-car.use-case';
import { GetCarByIdUseCase } from './modules/car/use-cases/get-car-by-id.use-case';
import { UpdateCarByIdUseCase } from './modules/car/use-cases/update-car-by-id.use-case';

@Module({
  controllers: [CarController],
  providers: [
    CarRepository,
    CreateCarUseCase,
    GetCarByIdUseCase,
    GetAllCarUseCase,
    UpdateCarByIdUseCase,
    DeleteCarUseCase,
  ],
  exports: [
    CarRepository,
    CreateCarUseCase,
    GetCarByIdUseCase,
    GetAllCarUseCase,
    UpdateCarByIdUseCase,
    DeleteCarUseCase,
  ],
})
export class CarModule {}
