import { IPaginationPayload } from 'src/shared/interfaces';

export interface IGetAllCarPayload extends IPaginationPayload {
  name?: string;
  brand?: string;
  year?: number;
  price?: number;
}
