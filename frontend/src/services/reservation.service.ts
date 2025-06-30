import { ICreateReservationPayload } from "@/dtos/reservation/payloads";
import { api } from "@/lib/axios";

class ReservationService {
  async create(data: ICreateReservationPayload): Promise<void> {
    const response = await api.post(`/reservation`, data);
    return response.data;
  }
}

export const reservationService = new ReservationService();
