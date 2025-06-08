import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';

interface IUpdateUserByIdUseCaseProps {
  userId: number;
  name?: string;
  email?: string;
}

export class UpdateUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userId,
    ...dataUpdate
  }: IUpdateUserByIdUseCaseProps): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, dataUpdate);

    const updatedUser = await this.userRepository.update(userId, user);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
