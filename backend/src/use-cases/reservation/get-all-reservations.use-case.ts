import { NotFoundException } from '@nestjs/common';
import { ReservationRepository } from 'src/repositories';

export class GetAllReservationsUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute() {
    const reservations = await this.reservationRepository.findAll();

    if (!reservations || reservations.length === 0) {
      throw new NotFoundException('No reservations found');
    }

    return reservations;
  }
}
