import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PaginationPayload } from 'src/shared/dtos/payloads';
import { IGetAllCarPayload } from '../../interfaces/dtos/payloads';

class DateReservationDto {
  @ApiPropertyOptional({
    description: 'Data de início da reserva.',
    example: '2025-06-16T10:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Data de fim da reserva.',
    example: '2025-06-21T10:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class GetAllCarPayload
  extends PaginationPayload
  implements IGetAllCarPayload
{
  @ApiPropertyOptional({
    description: 'Nome do carro para busca (busca parcial).',
    example: 'Corolla',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Placa do carro para busca (busca parcial).',
    example: 'ABC1D24',
  })
  @IsOptional()
  @Matches(/^[A-Z]{3}\d[A-Z]\d{2}$/, {
    message: 'Plate must follow the Mercosul format ABC1D23',
  })
  @IsString()
  plate?: string;

  @ApiPropertyOptional({
    description: 'Marca do carro para busca (busca parcial).',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Ano de fabricação do carro (busca exata).',
    example: 2022,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1950, { message: 'Year must be at least 1950' })
  @Max(new Date().getFullYear() + 1, {
    message: `Year cannot be greater than ${new Date().getFullYear() + 1}`,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'Período de reserva do carro.',
    type: DateReservationDto,
  })
  @IsOptional()
  @Type(() => DateReservationDto)
  dateReservation?: DateReservationDto;
}
