import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

interface ICreateUserUseCaseProps {
  name: string;
  email: string;
  password: string;
}
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserUseCaseProps: ICreateUserUseCaseProps) {
    const { email, name, password } = createUserUseCaseProps;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}
