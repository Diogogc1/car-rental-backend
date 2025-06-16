import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CarRepository } from 'src/modules/car/repositories';
import { CreateReservationResponse } from '../dtos/responses';
import { Reservation } from '../entities';
import { ICreateReservationPayload } from '../interfaces/payloads';
import { ReservationRepository } from '../repositories';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async execute(params: ICreateReservationPayload) {
    const car = await this.carRepository.findById(params.carId);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    if (!car.isAvailable(params.startDate, params.endDate)) {
      throw new ConflictException(
        'Car is not available for the selected dates',
      );
    }

    let reservation: Reservation;
    try {
      reservation = Reservation.create(params);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new ConflictException(message);
    }

    const newReservation = await this.reservationRepository.create(reservation);
    return CreateReservationResponse.fromEntity(newReservation);
  }
}
