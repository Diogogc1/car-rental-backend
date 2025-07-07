import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards';
import {
  CreateCarPayload,
  GetAllCarPayload,
  UpdateCarByIdPayload,
} from '../dtos/payloads';
import {
  CreateCarResponse,
  DeleteCarByIdResponse,
  GetAllCarResponse,
  GetCarByIdResponse,
  UpdateCarByIdResponse,
} from '../dtos/responses';
import { CreateCarUseCase } from '../use-cases/create-car.use-case';
import { DeleteCarUseCase } from '../use-cases/delete-car.use-case';
import { GetAllCarUseCase } from '../use-cases/get-all-car.use-case';
import { GetCarByIdUseCase } from '../use-cases/get-car-by-id.use-case';
import { UpdateCarByIdUseCase } from '../use-cases/update-car-by-id.use-case';

@ApiTags('Car')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('car')
export class CarController {
  constructor(
    private readonly createCarUseCase: CreateCarUseCase,
    private readonly getCarByIdUseCase: GetCarByIdUseCase,
    private readonly getAllCarsUseCase: GetAllCarUseCase,
    private readonly updateCarUseCase: UpdateCarByIdUseCase,
    private readonly deleteCarUseCase: DeleteCarUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo carro' })
  @ApiBody({ type: CreateCarPayload })
  @ApiResponse({
    status: 201,
    description: 'O carro foi criado com sucesso.',
    type: CreateCarResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Parâmetros inválidos. O corpo da resposta indicará os campos com erro.',
  })
  async create(@Body() body: CreateCarPayload) {
    return await this.createCarUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os carros' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (padrão: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Tamanho da página (padrão: 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de carros encontrada com sucesso.',
    type: [GetAllCarResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum carro encontrado.',
  })
  async getAll(@Query() getAllCarPayload: GetAllCarPayload) {
    console.log(getAllCarPayload);
    return await this.getAllCarsUseCase.execute(getAllCarPayload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado com sucesso.',
    type: GetCarByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.getCarByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados do carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiBody({
    type: UpdateCarByIdResponse,
    description: 'Dados do carro a serem atualizados',
  })
  @ApiResponse({
    status: 200,
    description: 'Carro atualizado com sucesso.',
    type: UpdateCarByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCarByIdPayload,
  ) {
    return await this.updateCarUseCase.execute(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar carro por ID' })
  @ApiResponse({
    status: 200,
    description: 'Carro deletado com sucesso.',
    type: DeleteCarByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteCarUseCase.execute(id);
  }
}
