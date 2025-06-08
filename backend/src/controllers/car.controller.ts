import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CreateCarPayload, UpdateCarPayload, CarResponse } from 'src/dtos';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateCarUseCase,
  DeleteCarUseCase,
  GetAllCarsUseCase,
  GetCarByIdUseCase,
  UpdateCarUseCase,
} from 'src/use-cases';
import { CarMapper } from 'src/mappers';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(
    private readonly createCarUseCase: CreateCarUseCase,
    private readonly getCarByIdUseCase: GetCarByIdUseCase,
    private readonly getAllCarsUseCase: GetAllCarsUseCase,
    private readonly updateCarUseCase: UpdateCarUseCase,
    private readonly deleteCarUseCase: DeleteCarUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo carro' })
  @ApiBody({ type: CreateCarPayload })
  @ApiResponse({
    status: 201,
    description: 'O carro foi criado com sucesso.',
    type: CarResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Parâmetros inválidos. O corpo da resposta indicará os campos com erro.',
  })
  async create(@Body() body: CreateCarPayload) {
    const car = await this.createCarUseCase.execute(body);
    return CarMapper.toResponseDto(car);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os carros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de carros encontrada com sucesso.',
    type: [CarResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum carro encontrado.',
  })
  async getAll() {
    const cars = await this.getAllCarsUseCase.execute();
    return cars.map((car) => CarMapper.toResponseDto(car));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado com sucesso.',
    type: CarResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async getById(@Param('id') id: string) {
    const car = await this.getCarByIdUseCase.execute(Number(id));
    return CarMapper.toResponseDto(car);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados do carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiBody({
    type: UpdateCarPayload,
    description: 'Dados do carro a serem atualizados',
  })
  @ApiResponse({
    status: 200,
    description: 'Carro atualizado com sucesso.',
    type: CarResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async updateById(@Param('id') id: string, @Body() body: UpdateCarPayload) {
    const car = await this.updateCarUseCase.execute({
      id: Number(id),
      ...body,
    });
    return CarMapper.toResponseDto(car);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiResponse({
    status: 200,
    description: 'Carro deletado com sucesso.',
    schema: { example: { message: 'Car deleted successfully' } },
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async deleteById(@Param('id') id: string) {
    await this.deleteCarUseCase.execute(Number(id));
    return { message: 'Car deleted successfully' };
  }
}
