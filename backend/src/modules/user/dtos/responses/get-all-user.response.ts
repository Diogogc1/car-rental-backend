import { GetAllReservationResponse } from 'src/modules/reservation/dtos/responses/get-all-reservation.response';
import { User } from '../../entities/user.entity';
import { IGetAllUserResponse } from '../../interfaces/dto/responses/get-all-user-response.interface';

export class GetAllUserResponse implements IGetAllUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: GetAllReservationResponse[];

  constructor(props: IGetAllUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.reservations = props.reservations;
  }

  static fromEntity(user: User): GetAllUserResponse {
    return new GetAllUserResponse({
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
