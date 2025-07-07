import { Module } from '@nestjs/common';
import { CarModule } from './car.module';
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
import { GetReservationsByCarIdUseCase } from './modules/reservation/use-cases/get-reservation-by-car.use-case';
import { GetReservationsByUserIdUseCase } from './modules/reservation/use-cases/get-reservation-by-user.use-case';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, CarModule],
  controllers: [ReservationController],
  providers: [
    ReservationRepository,
    CarRepository,
    CreateReservationUseCase,
    GetReservationByIdUseCase,
    GetReservationsByUserIdUseCase,
    GetReservationsByCarIdUseCase,
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
