import { Module } from '@nestjs/common';
import { CarRepository } from './modules/car/repositories/car.repository';
import { ReservationController } from './modules/reservation/controllers/reservation.controller';
import { ReservationRepository } from './modules/reservation/repositories/reservation.repository';
import {
  CreateReservationUseCase,
  DeleteReservationUseCase,
  GetAllReservationUseCase,
  GetReservationByIdUseCase,
  UpdateReservationByIdUseCase,
} from './modules/reservation/use-cases';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationRepository,
    CarRepository,
    CreateReservationUseCase,
    GetReservationByIdUseCase,
    GetAllReservationUseCase,
    UpdateReservationByIdUseCase,
    DeleteReservationUseCase,
  ],
  exports: [
    ReservationRepository,
    CreateReservationUseCase,
    GetReservationByIdUseCase,
    GetAllReservationUseCase,
    UpdateReservationByIdUseCase,
    DeleteReservationUseCase,
  ],
})
export class ReservationModule {}
