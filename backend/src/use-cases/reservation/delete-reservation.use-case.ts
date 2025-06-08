import { ReservationRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class DeleteReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: number): Promise<void> {
    const hasDeleted = await this.reservationRepository.delete(id);

    if (!hasDeleted) {
      throw new NotFoundException('Reservation not found');
    }
  }
}
