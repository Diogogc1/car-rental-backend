import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';
import { ConflictException } from '@nestjs/common';

interface ICreateUserUseCaseParams {
  name: string;
  email: string;
  password: string;
}
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: ICreateUserUseCaseParams) {
    const { email, name, password } = params;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const user = await User.createWithHashedPassword({
      name: name,
      email: email,
      password: password,
    });

    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}
