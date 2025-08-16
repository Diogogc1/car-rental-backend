import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInPayload } from '../dtos/payloads/sign-in.payload';
import { SignInUseCase } from '../use-cases/sign-in.use-case';

@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @ApiOperation({ summary: 'Fazer login' })
  @ApiBody({ type: SignInPayload })
  @ApiResponse({
    status: 200,
    description: 'Login feito com sucesso.',
    type: SignInUseCase,
  })
  @ApiResponse({
    status: 401,
    description: 'Parâmetros inválidos. Acesso não autorizado.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: SignInPayload) {
    return this.signInUseCase.execute(dto.email, dto.password);
  }
}
