import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserPayload } from '../dtos/payloads/create-user.payload';
import { UpdateUserByIdPayload } from '../dtos/payloads/update-user-by-id.payload';
import { CreateUserResponse } from '../dtos/responses/create-user.response';
import { DeleteUserByIdResponse } from '../dtos/responses/delete-user-by-id.response';
import { GetUserByIdResponse } from '../dtos/responses/get-user-by-id.response';
import { UpdateUserByIdResponse } from '../dtos/responses/update-user-by-id.response';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { DeleteUserByIdUseCase } from '../use-cases/delete-user-by-id.use-case';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.use-case';
import { UpdateUserByIdUseCase } from '../use-cases/update-user-by-id.usecase';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserByIdUseCase: UpdateUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserByIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserPayload })
  @ApiResponse({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Parâmetros inválidos. O corpo da resposta indicará os campos com erro.',
  })
  @ApiResponse({
    status: 409,
    description: 'O e-mail fornecido já está em uso por outro usuário.',
  })
  async create(@Body() body: CreateUserPayload) {
    return await this.createUserUseCase.execute(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
    type: GetUserByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.getUserByIdUseCase.execute(id);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar dados do usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiBody({
    type: UpdateUserByIdPayload,
    description: 'Dados do usuário a serem atualizados',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    type: UpdateUserByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async updateById(@Body() body: UpdateUserByIdPayload) {
    return await this.updateUserByIdUseCase.execute(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso.',
    type: DeleteUserByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteUserUseCase.execute(id);
  }
}
