import { DeleteUserResponse } from 'src/dtos';
import { UserRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class DeleteUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hasDeleted = await this.userRepository.delete(id);

    if (!hasDeleted) {
      throw new NotFoundException('User not found');
    }

    return DeleteUserResponse.fromEntity(user);
  }
}
