import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserByIdResponse } from '../dtos/responses/get-user-by-id.response';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
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
