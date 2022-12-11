import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user/get-user.decorator';
import { User } from 'src/auth/user/user.entity';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getFavorites(@GetUser() user: User): Promise<string[]> {
    return this.favoriteService.getFavorites(user);
  }

  @Post('/:mealId')
  @HttpCode(HttpStatus.OK)
  addMealToFavorite(
    @GetUser() user: User,
    @Param('mealId') mealId: string,
  ): Promise<string[]> {
    return this.favoriteService.addMealToFavorite(user, mealId);
  }

  @Delete('/:mealId')
  removeMealFromFavorites(
    @GetUser() user: User,
    @Param('mealId') mealId: string,
  ): Promise<string[]> {
    return this.favoriteService.removeMealFromFavorites(user, mealId);
  }
}
