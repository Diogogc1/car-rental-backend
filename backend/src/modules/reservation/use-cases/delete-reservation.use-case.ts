import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteReservationResponse } from '../dtos/responses';
import { ReservationRepository } from '../repositories';

@Injectable()
export class DeleteReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: number) {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    const hasDeleted = await this.reservationRepository.delete(id);

    if (!hasDeleted) {
      throw new NotFoundException('Reservation not found');
    }

    return DeleteReservationResponse.fromEntity(reservation);
  }
}
