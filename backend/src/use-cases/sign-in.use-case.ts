import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { JwtService } from '@nestjs/jwt';

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordIsValid = await user.verifyPassword(pass);

    if (!user || !passwordIsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
