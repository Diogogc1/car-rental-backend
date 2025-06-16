import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteUserByIdResponse } from '../dtos/responses/delete-user-by-id.response';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
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

    return DeleteUserByIdResponse.fromEntity(user);
  }
}
