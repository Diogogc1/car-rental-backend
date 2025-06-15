import { NotFoundException } from '@nestjs/common';
import { IUpdateUserByIdPayload, UpdateUserByIdResponse } from 'src/dtos';
import { UserRepository } from 'src/repositories';

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
