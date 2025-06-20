import { HttpStatus, Injectable } from '@nestjs/common';
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
      return Result.fail({
        message: 'Car is not available for the selected dates',
        httpStatus: HttpStatus.CONFLICT,
      });
    }

    const result = Reservation.create(params);

    if (result.isFail() && result.error) {
      return Result.fail({
        message: result.error.message,
        httpStatus: result.error.httpStatus,
      });
    }

    if (!result.data) {
      return Result.fail({
        message: 'Failed to create reservation',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    const newReservation = await this.reservationRepository.create(result.data);
    const response = CreateReservationResponse.fromEntity(newReservation);
    return Result.success(response);
  }
}
