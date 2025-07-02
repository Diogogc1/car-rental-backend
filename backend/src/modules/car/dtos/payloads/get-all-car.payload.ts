import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PaginationPayload } from 'src/shared/dtos/payloads';
import { IGetAllCarPayload } from '../../interfaces/dtos/payloads';

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
    description: 'Preço do carro (busca exata).',
    example: 150,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}
