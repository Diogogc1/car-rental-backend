import { ReservationResponse } from './reservation-response.dto';

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

  constructor(carReponse: ICarResponse) {
    this.id = carReponse.id;
    this.mark = carReponse.mark;
    this.year = carReponse.year;
    this.price = carReponse.price;
    this.status = carReponse.status;
    this.reservations = carReponse.reservations;
  }
}
