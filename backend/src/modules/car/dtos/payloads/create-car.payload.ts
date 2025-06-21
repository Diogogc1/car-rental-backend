import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { CarStatusPrisma } from 'generated/prisma';
import { ICreateCarPayload } from '../../interfaces/dtos/payloads';

export class CreateCarPayload implements ICreateCarPayload {
  @ApiProperty({
    description: 'O nome do carro.',
    example: 'Corolla XEi 2.0',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A placa do carro.',
    example: 'ABC-1234',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}\d[A-Z]\d{2}$/, {
    message: 'Plate must follow the Mercosul format ABC1D23',
  })
  plate: string;

  @ApiProperty({
    description: 'A marca do carro.',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'O ano de fabricação do carro.',
    example: 2022,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'O preço de aluguel do carro por dia.',
    example: 150,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'O status atual do carro.',
    enum: CarStatusPrisma,
    example: CarStatusPrisma.AVAILABLE,
  })
  @IsEnum(CarStatusPrisma)
  @IsNotEmpty()
  status: CarStatusPrisma;
}
