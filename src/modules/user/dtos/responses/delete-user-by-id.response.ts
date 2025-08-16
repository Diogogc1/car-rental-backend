import { DeleteReservationResponse } from '../../../reservation/dtos/responses/delete-reservation.response';
import { User } from '../../entities/user.entity';
import { IDeleteUserResponse } from '../../interfaces/dto/responses/delete-user-by-id.interface';

export class DeleteUserByIdResponse implements IDeleteUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: DeleteReservationResponse[];

  constructor(props: IDeleteUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.reservations = props.reservations;
  }

  static fromEntity(user: User): DeleteUserByIdResponse {
    return new DeleteUserByIdResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
      reservations: user.reservations?.map(
        (reservation) =>
          new DeleteReservationResponse({
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
