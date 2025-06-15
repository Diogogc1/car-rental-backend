import { ReservationResponse } from '../reservation-response';
import { User } from '../../../entities';

export interface IDeleteUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponse[];
}

export class DeleteUserResponse implements IDeleteUserResponse {
  id: number;
  name: string;
  email: string;
  reservations?: ReservationResponse[];

  constructor(props: IDeleteUserResponse) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.reservations = props.reservations;
  }

  static fromEntity(user: User): DeleteUserResponse {
    return new DeleteUserResponse({
      id: user.id!,
      name: user.name,
      email: user.email,
      reservations: user.reservations?.map(
        (reservation) =>
          new ReservationResponse({
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
