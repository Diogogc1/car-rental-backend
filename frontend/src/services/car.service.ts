import { IGetAllCarResponse, IGetCarByIdResponse } from "@/dtos/car/responses";
import { api } from "@/lib/axios";

class CarService {
  async getAllCars(
    name?: string,
    page: number = 1,
    limit: number = 10,
    dateReservation?: {
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ data: IGetAllCarResponse[]; total: number }> {
    const params = new URLSearchParams();
    if (name) {
      params.append("name", name);
    }
    if (dateReservation) {
      if (dateReservation.startDate) {
        params.append("startDate", dateReservation.startDate);
      }
      if (dateReservation.endDate) {
        params.append("endDate", dateReservation.endDate);
      }
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await api.get(`/car?${params.toString()}`);
    return response.data;
  }

  async getById(id: string): Promise<IGetCarByIdResponse> {
    const response = await api.get(`/car/${id}`);
    return response.data;
  }
}

export const carService = new CarService();
