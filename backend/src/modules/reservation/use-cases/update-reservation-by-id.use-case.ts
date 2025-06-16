import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateReservationByIdResponse } from '../dtos/responses/update-reservation-by-id.response';
import { IUpdateReservationByIdPayload } from '../interfaces/payloads';
import { ReservationRepository } from '../repositories';

@Injectable()
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
