import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { IUpdateUserByIdPayload } from '../interfaces';

export class UpdateUserByIdPayload implements IUpdateUserByIdPayload {
  @ApiPropertyOptional({
    description: 'O identificador único do user.',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

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
