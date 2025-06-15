import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationPayload } from '../pagination.payload';
import { IGetAllCarPayload } from '../interfaces';

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
