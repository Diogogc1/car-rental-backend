import { UserResponse } from '../user-response';
import { Reservation } from '../../../entities';

export interface IGetReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: UserResponse;
  car?: {
    id: number;
    name: string;
    brand: string;
    year: number;
    price: number;
    status: string;
  };
}

export class GetReservationByIdResponse implements IGetReservationByIdResponse {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: UserResponse;
  car?: {
    id: number;
    name: string;
    brand: string;
    year: number;
    price: number;
    status: string;
  };

  constructor(reservationResponse: GetReservationByIdResponse) {
    this.id = reservationResponse.id;
    this.userId = reservationResponse.userId;
    this.carId = reservationResponse.carId;
    this.startDate = reservationResponse.startDate;
    this.endDate = reservationResponse.endDate;
    this.totalPrice = reservationResponse.totalPrice;
    this.user = reservationResponse.user;
    this.car = reservationResponse.car;
  }

  static fromEntity(reservation: Reservation): GetReservationByIdResponse {
    return new GetReservationByIdResponse({
      id: reservation.id!,
      userId: reservation.userId,
      carId: reservation.carId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
      user: undefined,
      car: undefined,
    });
  }
}
