import { NotFoundException } from '@nestjs/common';
import { ReservationRepository } from 'src/repositories';

export class GetAllReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(page?: number, pageSize?: number) {
    const reservations = await this.reservationRepository.findAll(
      page,
      pageSize,
    );

    if (!reservations || reservations.length === 0) {
      throw new NotFoundException('No reservations found');
    }

    return reservations;
  }
}
