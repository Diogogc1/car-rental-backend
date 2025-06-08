import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { CarStatusPrisma } from 'generated/prisma';

export class UpdateCarPayload {
  @ApiPropertyOptional({
    description: 'A marca do carro.',
    example: 'Honda',
  })
  @IsOptional()
  @IsString()
  mark?: string;

  @ApiPropertyOptional({
    description: 'O ano de fabricação do carro.',
    example: 2023,
  })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiPropertyOptional({
    description: 'O preço de aluguel do carro por dia.',
    example: 175,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'O status atual do carro.',
    enum: CarStatusPrisma,
    example: CarStatusPrisma.RESERVED,
  })
  @IsOptional()
  @IsEnum(CarStatusPrisma)
  status?: CarStatusPrisma;
}
