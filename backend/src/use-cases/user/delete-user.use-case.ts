import { UserRepository } from 'src/repositories';
import { NotFoundException } from '@nestjs/common';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    const hasDeleted = await this.userRepository.delete(id);

    if (!hasDeleted) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}
