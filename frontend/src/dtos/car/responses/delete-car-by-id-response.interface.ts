import { CarStatus } from "../car-status.enum";

export interface IDeleteCarByIdResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatus;
}
