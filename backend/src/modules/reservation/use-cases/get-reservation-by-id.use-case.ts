import { Injectable, NotFoundException } from '@nestjs/common';
import { GetReservationByIdResponse } from '../dtos/responses';
import { ReservationRepository } from '../repositories';

@Injectable()
export class GetReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(reservationId: number) {
    const reservation =
      await this.reservationRepository.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return GetReservationByIdResponse.fromEntity(reservation);
  }
}
