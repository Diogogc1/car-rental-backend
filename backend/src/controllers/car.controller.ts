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
  GetAllCarPayload,
  CreateCarResponse,
  GetAllCarResponse,
  GetCarByIdResponse,
  UpdateCarByIdResponse,
  DeleteCarResponse,
  UpdateCarByIdPayload,
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
} from 'src/use-cases';

@ApiTags('Car')
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
    const { page, pageSize, brand, name, price, year } = getAllCarPayload;
    const result = await this.getAllCarsUseCase.execute({
      page: page || 1,
      pageSize: pageSize || 10,
      brand,
      name,
      price,
      year,
    });
    return {
      total: result.total,
      cars: result.data,
    };
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
  async getById(@Param('id') id: string) {
    return await this.getCarByIdUseCase.execute(Number(id));
  }

  @Put()
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
  async updateById(@Body() body: UpdateCarByIdPayload) {
    return await this.updateCarUseCase.execute(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiResponse({
    status: 200,
    description: 'Carro deletado com sucesso.',
    type: DeleteCarResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Carro não encontrado.',
  })
  async deleteById(@Param('id') id: string) {
    return await this.deleteCarUseCase.execute(Number(id));
  }
}
