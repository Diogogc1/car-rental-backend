import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers';
import { SignInUseCase } from './use-cases';
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
