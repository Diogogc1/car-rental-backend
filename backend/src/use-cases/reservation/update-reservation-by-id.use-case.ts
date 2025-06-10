import { Reservation } from 'src/entities';
import { ReservationRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

interface IUpdateReservationUseCaseParams {
  id: number;
  startDate?: Date;
  endDate?: Date;
  carId?: number;
  userId?: number;
  totalPrice?: number;
}

export class UpdateReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute({
    id,
    ...dataUpdate
  }: IUpdateReservationUseCaseParams): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    Object.assign(reservation, dataUpdate);

    const updatedReservation = await this.reservationRepository.update(
      id,
      reservation,
    );
    if (!updatedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return updatedReservation;
  }
}
