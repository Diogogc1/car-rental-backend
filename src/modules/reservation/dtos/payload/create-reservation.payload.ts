import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ICreateReservationPayload } from '../../interfaces/payloads';

export class CreateReservationPayload implements ICreateReservationPayload {
  @ApiProperty({
    description: 'Data de início da reserva.',
    example: '2025-06-15T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Data de fim da reserva.',
    example: '2025-06-20T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'ID do carro a ser reservado.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @ApiProperty({
    description: 'ID do usuário que está fazendo a reserva.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Preço total da reserva.',
    example: 750,
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
