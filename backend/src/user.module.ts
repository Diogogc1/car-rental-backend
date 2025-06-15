import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  UpdateUserByIdUseCase,
  DeleteUserByIdUseCase,
} from './use-cases';
import { UserRepository } from './repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserByIdUseCase,
    DeleteUserByIdUseCase,
  ],
  exports: [
    UserRepository,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserByIdUseCase,
    DeleteUserByIdUseCase,
  ],
})
export class UserModule {}
