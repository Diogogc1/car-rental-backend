import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationRepository } from './repositories/reservation.repository';
import { CarRepository } from './repositories/car.repository';
import {
  CreateReservationUseCase,
  GetReservationByIdUseCase,
  GetAllReservationUseCase,
  UpdateReservationByIdUseCase,
  DeleteReservationUseCase,
} from './use-cases';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationRepository,
    CarRepository, // Necessário para CreateReservationUseCase
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
