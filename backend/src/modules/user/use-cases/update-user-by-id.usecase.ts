import { Injectable, NotFoundException } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { UpdateUserByIdResponse } from '../dtos/responses/update-user-by-id.response';
import { IUpdateUserByIdPayload } from '../interfaces/dto/payloads';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    params: IUpdateUserByIdPayload,
  ): Promise<Result<UpdateUserByIdResponse>> {
    const { id, ...dataUpdate } = params;
    const user = await this.userRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.update(dataUpdate);

    await this.userRepository.update(user);

    const response = UpdateUserByIdResponse.fromEntity(user);
    return Result.success(response);
  }
}
