import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
