import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user/user.entity';
import { UserRepository } from 'src/auth/user/user.repository';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getFavorites(user: User): Promise<string[]> {
    return user.favorites;
  }

  async addMealToFavorite(user: User, mealId: string): Promise<string[]> {
    const userAlreadyHasInList = user.favorites.includes(mealId);

    if (!userAlreadyHasInList) {
      user.favorites.push(mealId);
      await this.userRepository.save(user);
    }

    return user.favorites;
  }

  async removeMealFromFavorites(user: User, mealId: string): Promise<string[]> {
    const userHasMealInList = user.favorites.includes(mealId);
    if (userHasMealInList) {
      user.favorites = user.favorites.filter((m) => m !== mealId);
      await this.userRepository.save(user);
    }

    return user.favorites;
  }
}
