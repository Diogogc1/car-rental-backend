import { NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/repositories';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
