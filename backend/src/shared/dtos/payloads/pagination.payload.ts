import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IPaginationPayload } from 'src/shared/interfaces';

export class PaginationPayload implements IPaginationPayload {
  @ApiPropertyOptional({
    description: 'Número da página (começando em 1).',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página.',
    example: 10,
    minimum: 1,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize: number = 10;
}
