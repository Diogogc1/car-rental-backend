import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { DeleteReservationResponse } from '../dtos/responses';
import { ReservationRepository } from '../repositories';

@Injectable()
export class DeleteReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: number): Promise<Result<DeleteReservationResponse>> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      return Result.fail({
        message: 'Reservation not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    await this.reservationRepository.delete(id);

    const response = DeleteReservationResponse.fromEntity(reservation);
    return Result.sucess(response);
  }
}
