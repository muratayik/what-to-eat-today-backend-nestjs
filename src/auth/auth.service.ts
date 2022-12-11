import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from './auth.utils';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';
import { ValidateDto } from './dto/validate.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from './user/user.entity';
import { UserRepository } from './user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<TokenDto> {
    const { email, username } = registerDto;
    await this.userRepository.createUser(registerDto);
    const payload: JwtPayload = { username, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordsMatch = await comparePasswords(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { username } = user;

    const payload: JwtPayload = { username, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async validate(user: User): Promise<ValidateDto> {
    const { id, email, username, favorites } = user;
    const validateDto: ValidateDto = {
      id,
      email,
      username,
      favorites,
    };

    return validateDto;
  }
}
