import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ISignInPayload } from '../../interfaces/dtos/payloads';

export class SignInPayload implements ISignInPayload {
  @ApiProperty({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário.',
  })
  @IsNotEmpty()
  password: string;
}
