import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserResponse } from '../dtos/responses/create-user.response';
import { User } from '../entities/user.entity';
import { ICreateUserPayload } from '../interfaces/dto/payloads';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: ICreateUserPayload) {
    const { email, name, password } = params;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const user = await User.createWithEncryptedPassword({
      name: name,
      email: email,
      password: password,
    });

    const newUser = await this.userRepository.create(user);
    return CreateUserResponse.fromEntity(newUser);
  }
}
