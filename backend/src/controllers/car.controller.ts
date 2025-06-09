import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import {
  CreateCarPayload,
  UpdateCarPayload,
  CarResponse,
  GetAllCarPayload,
  SearchCarPayload,
} from 'src/dtos';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CreateCarUseCase,
  DeleteCarUseCase,
  GetAllCarUseCase,
  GetCarByIdUseCase,
  UpdateCarByIdUseCase,
  SearchCarUseCase,
} from 'src/use-cases';
import { CarMapper } from 'src/mappers';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(
    private readonly createCarUseCase: CreateCarUseCase,
    private readonly getCarByIdUseCase: GetCarByIdUseCase,
    private readonly getAllCarsUseCase: GetAllCarUseCase,
    private readonly updateCarUseCase: UpdateCarByIdUseCase,
    private readonly deleteCarUseCase: DeleteCarUseCase,
    private readonly searchCarUseCase: SearchCarUseCase,
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
    type: [CarResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum carro encontrado.',
  })
  async getAll(@Query() getAllCarPayload: GetAllCarPayload) {
    const { page, pageSize } = getAllCarPayload;
    const cars = await this.getAllCarsUseCase.execute(page, pageSize);
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

  @Post('search')
  @ApiOperation({ summary: 'Buscar carros com filtros' })
  @ApiBody({
    type: SearchCarPayload,
    description: 'Parâmetros de busca e paginação para carros',
  })
  @ApiResponse({
    status: 200,
    description: 'Carros encontrados com sucesso.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/CarResponse' },
        },
        total: {
          type: 'number',
          description: 'Total de carros encontrados',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum carro encontrado com os critérios informados.',
  })
  async search(@Body() body: SearchCarPayload) {
    const result = await this.searchCarUseCase.execute(body);
    return {
      data: result.data.map((car) => CarMapper.toResponseDto(car)),
      total: result.total,
    };
  }
}
