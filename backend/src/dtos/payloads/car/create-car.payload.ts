import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { CarStatusPrisma } from 'generated/prisma';

export class CreateCarPayload {
  @ApiProperty({
    description: 'A marca do carro.',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  mark: string;

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
