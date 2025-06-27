import { IGetAllCarResponse } from "@/dtos/car/responses";
import { api } from "@/lib/axios";

class CarService {
  async getAllCars(): Promise<{ data: IGetAllCarResponse[]; total: number }> {
    const response = await api.get("/car");
    return response.data;
  }
}

export const carService = new CarService();
