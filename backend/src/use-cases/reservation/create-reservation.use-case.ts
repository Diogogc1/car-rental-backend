import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationResponse, ICreateReservationPayload } from 'src/dtos';
import { Reservation } from 'src/entities';
import { CarRepository, ReservationRepository } from 'src/repositories';

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
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new ConflictException(message);
    }

    const newReservation = await this.reservationRepository.create(reservation);
    return CreateReservationResponse.fromEntity(newReservation);
  }
}
