import { IGetUserByIdResponse } from "@/dtos/user/responses";
import { api } from "@/lib/axios";

class UserService {
  async getById(id: string): Promise<IGetUserByIdResponse> {
    const response = await api.get(`/user/${id}`);
    return response.data;
  }
}

export const userService = new UserService();
