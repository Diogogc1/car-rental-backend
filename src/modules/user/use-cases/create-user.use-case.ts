import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from 'src/shared/utils';
import { CreateUserResponse } from '../dtos/responses/create-user.response';
import { User } from '../entities/user.entity';
import { ICreateUserPayload } from '../interfaces/dto/payloads';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    params: ICreateUserPayload,
  ): Promise<Result<CreateUserResponse>> {
    const { email, name, password } = params;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return Result.fail({
        message: 'Email already exists',
        httpStatus: HttpStatus.CONFLICT,
      });
    }

    const user = await User.createWithEncryptedPassword({
      name: name,
      email: email,
      password: password,
    });

    const newUser = await this.userRepository.persist(user);
    const response = CreateUserResponse.fromEntity(newUser);
    return Result.success(response);
  }
}
