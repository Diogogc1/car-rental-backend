import { PaginationPayload } from 'src/shared/dtos/payloads';
import { IGetAllReservationPayload } from '../../interfaces/payloads';

export class GetAllReservationPayload
  extends PaginationPayload
  implements IGetAllReservationPayload {}
