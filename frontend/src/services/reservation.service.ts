import {
  ICreateReservationPayload,
  IUpdateReservationByIdPayload,
} from "@/dtos/reservation/payloads";
import { IGetAllReservationResponse } from "@/dtos/reservation/responses";
import { api } from "@/lib/axios";

class ReservationService {
  async create(data: ICreateReservationPayload): Promise<void> {
    const response = await api.post(`/reservation`, data);
    return response.data;
  }

  async getByUserId(userId: string): Promise<IGetAllReservationResponse[]> {
    const response = await api.get(`/reservation/user/${userId}`);
    return response.data;
  }

  async getByCarId(carId: string): Promise<IGetAllReservationResponse[]> {
    const response = await api.get(`/reservation/car/${carId}`);
    return response.data;
  }

  async update(
    id: number,
    data: IUpdateReservationByIdPayload
  ): Promise<IGetAllReservationResponse> {
    const response = await api.put(`/reservation/${id}`, data);
    return response.data;
  }

  async getById(id: string | number): Promise<IGetAllReservationResponse> {
    const response = await api.get(`/reservation/${id}`);
    return response.data;
  }
}

export const reservationService = new ReservationService();
