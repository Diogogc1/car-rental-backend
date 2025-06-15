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
  CreateReservationPayload,
  UpdateReservationPayload,
  GetAllReservationPayload,
  CreateReservationResponse,
  GetAllReservationResponse,
  GetReservationByIdResponse,
  UpdateReservationByIdResponse,
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
  CreateReservationUseCase,
  DeleteReservationUseCase,
  GetAllReservationUseCase,
  GetReservationByIdUseCase,
  UpdateReservationByIdUseCase,
} from 'src/use-cases';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
    private readonly getReservationByIdUseCase: GetReservationByIdUseCase,
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
    type: [GetAllReservationResponse],
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
  async getById(@Param('id') id: string) {
    return await this.getReservationByIdUseCase.execute(Number(id));
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
  async updateById(@Body() body: UpdateReservationPayload) {
    return await this.updateReservationByIdUseCase.execute(body);
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
  async deleteById(@Param('id') id: string) {
    await this.deleteReservationUseCase.execute(Number(id));
    return { message: 'Reservation deleted successfully' };
  }
}
