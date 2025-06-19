import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CarRepository } from 'src/modules/car/repositories';
import { Result } from 'src/shared/utils';
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

  async execute(
    params: ICreateReservationPayload,
  ): Promise<Result<CreateReservationResponse>> {
    const car = await this.carRepository.findById(params.carId);

    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
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
    const response = CreateReservationResponse.fromEntity(newReservation);
    return Result.sucess(response);
  }
}
