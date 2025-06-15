import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CarRepository } from './repositories/car.repository';
import {
  CreateCarUseCase,
  GetCarByIdUseCase,
  GetAllCarUseCase,
  UpdateCarByIdUseCase,
  DeleteCarUseCase,
} from './use-cases';

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
