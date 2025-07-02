import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { IUpdateCarByIdPayload } from '../../interfaces/dtos/payloads';

export class UpdateCarByIdPayload implements IUpdateCarByIdPayload {
  @ApiPropertyOptional({
    description: 'O nome do carro.',
    example: 'Civic EXL 1.5 Turbo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'A placa do carro.',
    example: 'ABC1D23',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{3}\d[A-Z]\d{2}$/, {
    message: 'Plate must follow the Mercosul format ABC1D23',
  })
  plate?: string;

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
    description: 'A URL da imagem do carro.',
    example: 'https://example.com/car-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
