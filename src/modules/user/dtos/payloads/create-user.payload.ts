import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ICreateUserPayload } from '../../interfaces/dto/payloads';

export class CreateUserPayload implements ICreateUserPayload {
  @ApiProperty({
    description: 'O nome completo do usuário.',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => String(value).toLowerCase().trim())
  email: string;

  @ApiProperty({
    description:
      'A senha de acesso do usuário. Deve conter no mínimo 6 caracteres.',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
