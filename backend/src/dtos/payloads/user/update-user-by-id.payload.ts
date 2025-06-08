import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserByIdPayload {
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
