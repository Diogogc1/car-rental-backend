import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationPayload {
  @ApiProperty({
    description: 'Data de início da reserva.',
    example: '2025-06-15T10:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'Data de fim da reserva.',
    example: '2025-06-20T10:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
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
