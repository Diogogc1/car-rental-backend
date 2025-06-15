import { NotFoundException } from '@nestjs/common';
import { GetUserByIdResponse } from 'src/dtos';
import { UserRepository } from 'src/repositories';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return GetUserByIdResponse.fromEntity(user);
  }
}
