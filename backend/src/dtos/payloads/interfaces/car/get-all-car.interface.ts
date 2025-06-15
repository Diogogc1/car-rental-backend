import { IPaginationPayload } from '../pagination.interface';

export interface IGetAllCarPayload extends IPaginationPayload {
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
}
