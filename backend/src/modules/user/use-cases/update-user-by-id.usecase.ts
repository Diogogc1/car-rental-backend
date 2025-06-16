import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserByIdResponse } from '../dtos/responses/update-user-by-id.response';
import { IUpdateUserByIdPayload } from '../interfaces/dto/payloads';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: IUpdateUserByIdPayload) {
    const { id, ...dataUpdate } = params;
    const user = await this.userRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.update(dataUpdate);

    const updatedUser = await this.userRepository.update(user);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return UpdateUserByIdResponse.fromEntity(updatedUser);
  }
}
