import { HttpStatus, Injectable } from '@nestjs/common';
import { CarRepository } from 'src/modules/car/repositories';
import { GetManyReservationResponse } from 'src/modules/reservation/dtos/responses';
import { ReservationRepository } from 'src/modules/reservation/repositories';
import { Result } from 'src/shared/utils';

@Injectable()
export class GetReservationsByCarIdUseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(carId: number): Promise<Result<GetManyReservationResponse[]>> {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      return Result.fail({
        message: 'Car not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const reservation = await this.reservationRepository.findByCarId(carId);

    if (!reservation || reservation.length === 0) {
      return Result.fail({
        message: 'No reservations found for this car',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = reservation.map((reservation) =>
      GetManyReservationResponse.fromEntity(reservation),
    );

    return Result.success(response);
  }
}
