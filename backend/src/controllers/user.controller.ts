import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import {
  CreateUserPayload,
  CreateUserResponse,
  DeleteUserResponse,
  GetUserByIdResponse,
  UpdateUserByIdPayload,
  UpdateUserByIdResponse,
} from 'src/dtos';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateUserUseCase,
  DeleteUserByIdUseCase,
  GetUserByIdUseCase,
  UpdateUserByIdUseCase,
} from 'src/use-cases';

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
  async getById(@Param('id') id: string) {
    return await this.getUserByIdUseCase.execute(Number(id));
  }

  @Put(':id')
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
    type: DeleteUserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async deleteById(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute(Number(id));
  }
}
