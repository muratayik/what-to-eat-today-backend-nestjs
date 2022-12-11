import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { generateHashedPassword } from '../auth.utils';
import { RegisterDto } from '../dto/register.dto';
import { User } from './user.entity';

const DUPLICATE_USER_NAME_ERROR_CODE = '23505';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const { username, email, password } = registerDto;

    const hashedPassword = await generateHashedPassword(password);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
      favorites: [],
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === DUPLICATE_USER_NAME_ERROR_CODE) {
        throw new ConflictException('A user with this Email already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
