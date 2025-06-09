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
  CreateReservationPayload,
  UpdateReservationPayload,
  ReservationResponse,
  GetAllReservationPayload,
} from 'src/dtos';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateReservationUseCase,
  DeleteReservationUseCase,
  GetAllReservationUseCase,
  GetReservationByIdUseCase,
  UpdateReservationByIdUseCase,
} from 'src/use-cases';
import { ReservationMapper } from 'src/mappers';

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
    type: ReservationResponse,
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
    const reservation = await this.createReservationUseCase.execute(body);
    return ReservationMapper.toResponseDto(reservation);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as reservas' })
  @ApiBody({
    type: GetAllReservationPayload,
    description: 'Parâmetros de paginação para busca de reservas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas encontrada com sucesso.',
    type: [ReservationResponse],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma reserva encontrada.',
  })
  async getAll(@Body() body: GetAllReservationPayload) {
    const { page, pageSize } = body;
    const reservations = await this.getAllReservationsUseCase.execute(
      page,
      pageSize,
    );
    return reservations.map((reservation) =>
      ReservationMapper.toResponseDto(reservation),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da reserva' })
  @ApiResponse({
    status: 200,
    description: 'Reserva encontrada com sucesso.',
    type: ReservationResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  async getById(@Param('id') id: string) {
    const reservation = await this.getReservationByIdUseCase.execute(
      Number(id),
    );
    return ReservationMapper.toResponseDto(reservation);
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
    type: ReservationResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  async updateById(
    @Param('id') id: string,
    @Body() body: UpdateReservationPayload,
  ) {
    const reservation = await this.updateReservationByIdUseCase.execute({
      id: Number(id),
      ...body,
    });
    return ReservationMapper.toResponseDto(reservation);
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
