import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { Result } from 'src/shared/utils';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    pass: string,
  ): Promise<Result<{ access_token: string }>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return Result.fail({
        message: 'Invalid email or password',
        httpStatus: HttpStatus.UNAUTHORIZED,
      });
    }

    const passwordIsValid = await user.verifyPassword(pass);

    if (!user || !passwordIsValid) {
      return Result.fail({
        message: 'Invalid email or password',
        httpStatus: HttpStatus.UNAUTHORIZED,
      });
    }
    const payload = { sub: user.id, username: user.name };
    const response = {
      access_token: await this.jwtService.signAsync(payload),
    };

    return Result.success(response);
  }
}
