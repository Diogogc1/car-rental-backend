import { Module } from '@nestjs/common';
import {
  AppController,
  CarController,
  ReservationController,
  UserController,
} from './controllers';
import {
  AppService,
  // User use cases
  CreateUserUseCase,
  GetUserByIdUseCase,
  DeleteUserByIdUseCase,
  UpdateUserByIdUseCase,
  // Car use cases
  CreateCarUseCase,
  GetCarByIdUseCase,
  GetAllCarUseCase,
  UpdateCarByIdUseCase,
  DeleteCarUseCase,
  SearchCarUseCase,
  // Reservation use cases
  CreateReservationUseCase,
  GetReservationByIdUseCase,
  GetAllReservationUseCase,
  UpdateReservationByIdUseCase,
  DeleteReservationUseCase,
} from './use-cases';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    CarController,
    ReservationController,
  ],
  providers: [
    AppService,
    // User use cases
    CreateUserUseCase,
    GetUserByIdUseCase,
    DeleteUserByIdUseCase,
    UpdateUserByIdUseCase,
    // Car use cases
    CreateCarUseCase,
    GetCarByIdUseCase,
    GetAllCarUseCase,
    UpdateCarByIdUseCase,
    DeleteCarUseCase,
    SearchCarUseCase,
    // Reservation use cases
    CreateReservationUseCase,
    GetReservationByIdUseCase,
    GetAllReservationUseCase,
    UpdateReservationByIdUseCase,
    DeleteReservationUseCase,
  ],
})
export class AppModule {}
