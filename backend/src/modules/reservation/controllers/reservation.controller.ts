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
import { CreateReservationPayload } from '../dtos/payload/create-reservation.payload';
import { GetAllReservationPayload } from '../dtos/payload/get-all-reservation.payload';
import { UpdateReservationPayload } from '../dtos/payload/update-reservation.payload';
import { CreateReservationResponse } from '../dtos/responses/create-reservation.response';
import { GetManyReservationResponse } from '../dtos/responses/get-many-reservation.response';
import { GetReservationByIdResponse } from '../dtos/responses/get-reservation-by-id.response';
import { UpdateReservationByIdResponse } from '../dtos/responses/update-reservation-by-id.response';
import {
  CreateReservationUseCase,
  DeleteReservationUseCase,
  GetAllReservationUseCase,
  GetReservationByIdUseCase,
  UpdateReservationByIdUseCase,
} from '../use-cases';
import { GetReservationsByCarIdUseCase } from '../use-cases/get-reservation-by-car.use-case';
import { GetReservationsByUserIdUseCase } from '../use-cases/get-reservation-by-user.use-case';

@ApiTags('Reservation')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
    private readonly getReservationByIdUseCase: GetReservationByIdUseCase,
    private readonly getReservationsByUserIdUseCase: GetReservationsByUserIdUseCase,
    private readonly getReservationsByCarIdUseCase: GetReservationsByCarIdUseCase,
    private readonly getAllReservationsUseCase: GetAllReservationUseCase,
    private readonly updateReservationByIdUseCase: UpdateReservationByIdUseCase,
    private readonly deleteReservationUseCase: DeleteReservationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova reserva' })
  @ApiBody({ type: CreateReservationPayload })
  @ApiResponse({
    status: 201,
    description: 'A reserva foi criada com sucesso.',
    type: CreateReservationResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Parâmetros inválidos. O corpo da resposta indicará os campos com erro.',
  })
  @ApiResponse({
    status: 409,
    description: 'O carro não está disponível para as datas selecionadas.',
  })
  async create(@Body() body: CreateReservationPayload) {
    return await this.createReservationUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as reservas' })
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
    description: 'Lista de reservas encontrada com sucesso.',
    type: [GetManyReservationResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma reserva encontrada.',
  })
  async getAll(@Query() getAllReservationPayload: GetAllReservationPayload) {
    return await this.getAllReservationsUseCase.execute(
      getAllReservationPayload,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da reserva' })
  @ApiResponse({
    status: 200,
    description: 'Reserva encontrada com sucesso.',
    type: GetReservationByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.getReservationByIdUseCase.execute(id);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Buscar reservas do usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Reservas do usuario encontradas com sucesso.',
    type: [GetManyReservationResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Reservas do usuário não encontradas.',
  })
  async getByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.getReservationsByUserIdUseCase.execute(id);
  }

  @Get('/car/:id')
  @ApiOperation({ summary: 'Buscar reservas do carro por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do carro' })
  @ApiResponse({
    status: 200,
    description: 'Reservas do carro encontradas com sucesso.',
    type: [GetReservationByIdResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Reservas do carro não encontradas.',
  })
  async getByCarId(@Param('id', ParseIntPipe) id: number) {
    return await this.getReservationsByCarIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados da reserva por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da reserva' })
  @ApiBody({
    type: UpdateReservationPayload,
    description: 'Dados da reserva a serem atualizados',
  })
  @ApiResponse({
    status: 200,
    description: 'Reserva atualizada com sucesso.',
    type: UpdateReservationByIdResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateReservationPayload,
  ) {
    return await this.updateReservationByIdUseCase.execute(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar reserva por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da reserva' })
  @ApiResponse({
    status: 200,
    description: 'Reserva deletada com sucesso.',
    schema: { example: { message: 'Reservation deleted successfully' } },
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteReservationUseCase.execute(id);
  }
}
