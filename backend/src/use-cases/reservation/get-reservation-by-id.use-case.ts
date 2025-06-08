import { NotFoundException } from '@nestjs/common';
import { ReservationRepository } from 'src/repositories';

export class GetReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(reservationId: number) {
    const reservation =
      await this.reservationRepository.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }
}
