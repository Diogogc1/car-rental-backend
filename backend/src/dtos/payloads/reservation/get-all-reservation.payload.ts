import { PaginationPayload } from '../pagination.payload';
import { IGetAllReservationPayload } from '../interfaces';

export class GetAllReservationPayload
  extends PaginationPayload
  implements IGetAllReservationPayload {}
