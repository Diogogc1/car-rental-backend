import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { DeleteUserByIdResponse } from '../dtos/responses/delete-user-by-id.response';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<Result<DeleteUserByIdResponse>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return Result.fail({
        message: 'User not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    await this.userRepository.delete(id);

    const response = DeleteUserByIdResponse.fromEntity(user);
    return Result.success(response);
  }
}
