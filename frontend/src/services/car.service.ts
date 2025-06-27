import { IGetAllCarResponse } from "@/dtos/car/responses";
import { api } from "@/lib/axios";

class CarService {
  async getAllCars(
    name?: string
  ): Promise<{ data: IGetAllCarResponse[]; total: number }> {
    const response = await api.get(`/car?name=${name || ""}`);
    return response.data;
  }
}

export const carService = new CarService();
