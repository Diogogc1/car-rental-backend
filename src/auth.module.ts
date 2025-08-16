import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { SignInUseCase } from './modules/auth/use-cases/sign-in.use-case';
import { UserModule } from './user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [SignInUseCase],
  exports: [SignInUseCase],
})
export class AuthModule {}
