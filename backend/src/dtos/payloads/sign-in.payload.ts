import { IsNotEmpty, IsString } from 'class-validator';
import { ISignInPayload } from './interfaces/sign-in.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SignInPayload implements ISignInPayload {
  @ApiProperty({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'O email do usuário.',
    example: 'joaodasilva@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
