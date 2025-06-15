import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllReservationResponse, IGetAllReservationPayload } from 'src/dtos';
import { ReservationRepository } from 'src/repositories';

@Injectable()
export class GetAllReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(params: IGetAllReservationPayload) {
    const { page, pageSize } = params;
    const reservations = await this.reservationRepository.findAll(
      page,
      pageSize,
    );

    if (!reservations || reservations.length === 0) {
      throw new NotFoundException('No reservations found');
    }

    return reservations.map((reservation) =>
      GetAllReservationResponse.fromEntity(reservation),
    );
  }
}
