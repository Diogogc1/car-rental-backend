import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { UpdateReservationByIdResponse } from '../dtos/responses/update-reservation-by-id.response';
import { IUpdateReservationByIdPayload } from '../interfaces/payloads';
import { ReservationRepository } from '../repositories';

@Injectable()
export class UpdateReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(
    params: IUpdateReservationByIdPayload,
  ): Promise<Result<UpdateReservationByIdResponse>> {
    const { id, ...dataUpdate } = params;
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      return Result.fail({
        message: 'Reservation not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    reservation.update(dataUpdate);

    await this.reservationRepository.update(reservation);

    const response = UpdateReservationByIdResponse.fromEntity(reservation);
    return Result.success(response);
  }
}
