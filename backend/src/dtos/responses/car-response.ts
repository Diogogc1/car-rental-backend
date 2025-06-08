import { ReservationResponse } from './reservation-response';

export interface ICarResponse {
  id: number;
  mark: string;
  year: number;
  price: number;
  status: string;
  reservations?: ReservationResponse[];
}

export class CarResponse implements ICarResponse {
  id: number;
  mark: string;
  year: number;
  price: number;
  status: string;
  reservations?: ReservationResponse[];

  constructor(carResponse: ICarResponse) {
    this.id = carResponse.id;
    this.mark = carResponse.mark;
    this.year = carResponse.year;
    this.price = carResponse.price;
    this.status = carResponse.status;
    this.reservations = carResponse.reservations;
  }
}
