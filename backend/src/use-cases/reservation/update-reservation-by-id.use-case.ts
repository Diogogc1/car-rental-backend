import {
  IUpdateReservationByIdPayload,
  UpdateReservationByIdResponse,
} from 'src/dtos';
import { ReservationRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class UpdateReservationByIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(params: IUpdateReservationByIdPayload) {
    const { id, ...dataUpdate } = params;
    const reservation = await this.reservationRepository.findById(Number(id));
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    reservation.update(dataUpdate);

    const updatedReservation =
      await this.reservationRepository.update(reservation);
    if (!updatedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return UpdateReservationByIdResponse.fromEntity(updatedReservation);
  }
}
