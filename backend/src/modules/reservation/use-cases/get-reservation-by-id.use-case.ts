import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { GetReservationByIdResponse } from '../dtos/responses';
import { ReservationRepository } from '../repositories';

@Injectable()
export class GetReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: number): Promise<Result<GetReservationByIdResponse>> {
    const reservation = await this.reservationRepository.findById(id);

    if (!reservation) {
      return Result.fail({
        message: 'Reservation not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = GetReservationByIdResponse.fromEntity(reservation);
    return Result.success(response);
  }
}
