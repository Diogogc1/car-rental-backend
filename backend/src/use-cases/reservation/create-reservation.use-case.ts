import { Reservation } from 'src/entities';
import { CarRepository, ReservationRepository } from 'src/repositories';
import { ConflictException } from '@nestjs/common';

interface ICreateReservationUseCaseProps {
  startDate: Date;
  endDate: Date;
  carId: number;
  userId: number;
  totalPrice: number;
}

export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async execute(createReservationUseCaseProps: ICreateReservationUseCaseProps) {
    const carIsReserved = await this.carRepository.verifyIfReserved(
      createReservationUseCaseProps.carId,
      createReservationUseCaseProps.startDate,
      createReservationUseCaseProps.endDate,
    );

    if (carIsReserved) {
      throw new ConflictException(
        'Car is not available for the selected dates',
      );
    }

    const reservation = new Reservation(createReservationUseCaseProps);
    const newReservation = await this.reservationRepository.create(reservation);
    return newReservation;
  }
}
