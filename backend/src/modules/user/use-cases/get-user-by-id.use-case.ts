import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { GetUserByIdResponse } from '../dtos/responses/get-user-by-id.response';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<Result<GetUserByIdResponse>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return Result.fail({
        message: 'User not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    const response = GetUserByIdResponse.fromEntity(user);
    return Result.sucess(response);
  }
}
