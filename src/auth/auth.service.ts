import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from './auth.utils';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user/user.entity';
import { UserRepository } from './user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return this.userRepository.createUser(registerDto);
  }

  async login(loginDto: LoginDto): Promise<boolean> {
    const { email, password } = loginDto;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordsMatch = await comparePasswords(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
