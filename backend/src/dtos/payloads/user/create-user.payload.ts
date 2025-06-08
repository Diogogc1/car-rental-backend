import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserPayload {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome completo do usuário.',
    example: 'João da Silva',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'A senha de acesso do usuário. Deve conter no mínimo 6 caracteres.',
    example: 'S3nh@F0rt3!',
    required: true,
    minLength: 8,
  })
  @MinLength(6)
  password: string;
}
