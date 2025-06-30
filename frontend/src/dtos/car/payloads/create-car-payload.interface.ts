import { CarStatus } from "../car-status.enum";

export interface ICreateCarPayload {
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatus;
}
