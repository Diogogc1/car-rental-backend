import { IPaginationPayload } from 'src/shared/interfaces';

export interface IGetAllCarPayload extends IPaginationPayload {
  name?: string;
  plate?: string;
  brand?: string;
  year?: number;
  price?: number;
  dateReservation?: {
    startDate?: Date;
    endDate?: Date;
  };
}
