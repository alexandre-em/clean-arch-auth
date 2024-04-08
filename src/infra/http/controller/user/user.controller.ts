import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/user/use-case/create-user';
import { GetUserByIdUseCase } from 'src/application/user/use-case/get-user-by-id';
import JwtAuthenticationGuard from 'src/infra/guards/jwt/jwt.guard';
// import { CacheKey } from '@nestjs/cache-manager';
// import { HttpCacheInterceptor } from '@app/infra/persistence/cache/interceptor/http-cache.interceptor';
//
import { CreateUserDto } from '../../dto/user/create-user';

@Controller('/users')
@ApiTags('User')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  // @CacheKey('users')
  // @UseInterceptors(HttpCacheInterceptor)
  getById(@Param('id') id: string) {
    const response = this.getUserByIdUseCase.execute({ id });

    return new Promise((resolve) => {
      response.then(({ props }) => {
        const data = { ...props };
        delete data.password;

        resolve(data);
      });
    });
  }

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }
}