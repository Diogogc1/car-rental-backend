import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { GetAllReservationResponse } from '../dtos/responses';
import { IGetAllReservationPayload } from '../interfaces/payloads';
import { ReservationRepository } from '../repositories';

@Injectable()
export class GetAllReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(
    params: IGetAllReservationPayload,
  ): Promise<Result<GetAllReservationResponse[]>> {
    const { page, limit: pageSize } = params;
    const reservations = await this.reservationRepository.findAll(
      page,
      pageSize,
    );

    if (!reservations || reservations.length === 0) {
      return Result.fail({
        message: 'No reservations found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = reservations.map((reservation) =>
      GetAllReservationResponse.fromEntity(reservation),
    );
    return Result.success(response);
  }
}
