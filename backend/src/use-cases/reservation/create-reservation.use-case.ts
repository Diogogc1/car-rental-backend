import { Reservation } from 'src/entities';
import { CarRepository, ReservationRepository } from 'src/repositories';
import { ConflictException, NotFoundException } from '@nestjs/common';

interface ICreateReservationUseCaseParams {
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

  async execute(params: ICreateReservationUseCaseParams) {
    const car = await this.carRepository.findById(params.carId);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    if (car.isAvailable(params.startDate, params.endDate)) {
      throw new ConflictException(
        'Car is not available for the selected dates',
      );
    }

    const reservation = new Reservation(params);

    try {
      Reservation.create(reservation);
    } catch (error) {
      throw new ConflictException(error);
    }

    const newReservation = await this.reservationRepository.create(reservation);
    return newReservation;
  }
}
