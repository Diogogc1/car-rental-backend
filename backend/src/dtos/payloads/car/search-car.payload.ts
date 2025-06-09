import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchCarPayload {
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
  mark?: string;

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

  @ApiPropertyOptional({
    description: 'Número da página (começando em 1).',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página.',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 10;
}
