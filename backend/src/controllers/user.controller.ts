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
  UpdateUserByIdPayload,
  UserResponse,
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
import { UserMapper } from 'src/mappers';

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
    type: UserResponse,
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
    const user = await this.createUserUseCase.execute(body);
    return UserMapper.toResponseDto(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
    type: UserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async getById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(Number(id));
    return UserMapper.toResponseDto(user);
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
    type: UserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateUserByIdPayload,
  ) {
    const user = await this.updateUserByIdUseCase.execute({
      userId: Number(id),
      ...body,
    });
    return UserMapper.toResponseDto(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso.',
    schema: { example: { message: 'User deleted successfully' } },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  async deleteById(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(Number(id));
    return { message: 'User deleted successfully' };
  }
}
