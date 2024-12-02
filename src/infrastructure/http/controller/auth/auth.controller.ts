import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { JWT_EXPIRATION, JWT_REFRESH } from 'src/core/constants';
import { TokenService, UserToTokenPayload } from 'src/domain/adaptaters/token.interface';
import { GoogleAuthenticationGuard } from 'src/infrastructure/guards/google/google.guard';
import JwtRefreshAuthenticationGuard from 'src/infrastructure/guards/jwt/refresh.guard';
import { LocalAuthenticationGuard } from 'src/infrastructure/guards/local/local.guard';

import { RefreshTokenDto, SignInDto } from '../../dto/auth';

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService) {}

  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: any, @Res({ passthrough: true }) res: any) {
    if (req.user instanceof Error) {
      throw req.user;
    }

    const { accessToken, refreshToken } = req.user;
    const expires = new Date(Date.now() + JWT_EXPIRATION * 1000);
    const refreshExpires = new Date(Date.now() + JWT_REFRESH * 1000);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'lax',
        expires,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'lax',
        expires: refreshExpires,
      })
      .send({ accessToken, refreshToken });
  }

  @Get('/google/login')
  @UseGuards(GoogleAuthenticationGuard)
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(GoogleAuthenticationGuard)
  googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const { accessToken, refreshToken } = req.user;
    const expires = new Date(Date.now() + JWT_EXPIRATION * 1000);
    const refreshExpires = new Date(Date.now() + JWT_REFRESH * 1000);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'lax',
        expires,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'lax',
        expires: refreshExpires,
      })
      .redirect(new URL(`http://localhost:3000/en/redirect?accessToken=${accessToken}&refresh=${refreshToken}`).toString());
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthenticationGuard)
  @Post('/token/refresh')
  refresh(@Req() req: any) {
    const accessToken = this.tokenService.generateToken(UserToTokenPayload(req.user), process.env.JWT_SECRET!, JWT_EXPIRATION);

    return {
      accessToken,
    };
  }
}
