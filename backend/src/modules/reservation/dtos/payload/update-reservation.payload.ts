import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { IUpdateReservationByIdPayload } from '../../interfaces/payloads';

export class UpdateReservationPayload implements IUpdateReservationByIdPayload {
  @ApiPropertyOptional({
    description: 'Data de início da reserva.',
    example: '2025-06-16T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Data de fim da reserva.',
    example: '2025-06-21T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'ID do carro a ser reservado.',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  carId?: number;

  @ApiPropertyOptional({
    description: 'ID do usuário que está fazendo a reserva.',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({
    description: 'Preço total da reserva.',
    example: 825,
  })
  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
