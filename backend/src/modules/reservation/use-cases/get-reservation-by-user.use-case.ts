import { HttpStatus, Injectable } from '@nestjs/common';
import { GetManyReservationResponse } from 'src/modules/reservation/dtos/responses';
import { ReservationRepository } from 'src/modules/reservation/repositories';
import { Result } from 'src/shared/utils';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class GetReservationsByUserIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(userId: number): Promise<Result<GetManyReservationResponse[]>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return Result.fail({
        message: 'User not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const reservation = await this.reservationRepository.findByUserId(userId);

    if (!reservation || reservation.length === 0) {
      return Result.fail({
        message: 'No reservations found for this user',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = reservation.map((reservation) =>
      GetManyReservationResponse.fromEntity(reservation),
    );

    return Result.success(response);
  }
}
