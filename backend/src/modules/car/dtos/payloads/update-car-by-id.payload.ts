import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CarStatusPrisma } from 'generated/prisma';
import { IUpdateCarByIdPayload } from '../../interfaces/dtos/payloads';

export class UpdateCarByIdPayload implements IUpdateCarByIdPayload {
  @ApiPropertyOptional({
    description: 'O identificador único do carro.',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiPropertyOptional({
    description: 'O nome do carro.',
    example: 'Civic EXL 1.5 Turbo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'A marca do carro.',
    example: 'Honda',
  })
  @IsOptional()
  @IsString()
  brand?: string;

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
