import { GetAllReservationResponse } from 'src/modules/reservation/dtos/responses';
import { User } from '../../entities/user.entity';
import { IUpdateUserByIdResponse } from '../../interfaces/dto/responses';

export class UpdateUserByIdResponse implements IUpdateUserByIdResponse {
  id: number;
  name: string;
  email: string;
  reservations?: GetAllReservationResponse[];

  constructor(props: IUpdateUserByIdResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.reservations = props.reservations;
  }

  static fromEntity(user: User): UpdateUserByIdResponse {
    return new UpdateUserByIdResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
      reservations: user.reservations?.map(
        (reservation) =>
          new GetAllReservationResponse({
            id: reservation.id!,
            userId: reservation.userId,
            carId: reservation.carId,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice: reservation.totalPrice,
          }),
      ),
    });
  }
}
