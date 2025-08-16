import { Module } from '@nestjs/common';
import { UserController } from './modules/user/controllers/user.controller';
import { UserRepository } from './modules/user/repositories/user.repository';
import { CreateUserUseCase } from './modules/user/use-cases/create-user.use-case';
import { DeleteUserByIdUseCase } from './modules/user/use-cases/delete-user-by-id.use-case';
import { GetUserByIdUseCase } from './modules/user/use-cases/get-user-by-id.use-case';
import { UpdateUserByIdUseCase } from './modules/user/use-cases/update-user-by-id.usecase';

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
