import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IUpdateUserByIdPayload } from '../../interfaces/dto/payloads';

export class UpdateUserByIdPayload implements IUpdateUserByIdPayload {
  @ApiPropertyOptional({
    description: 'O identificador único do user.',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
    description: 'O nome completo do usuário.',
    example: 'João da Silva',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
