import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthDto} from './dto/auth.dto'
import {JwtService} from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    try {
      const loggedIn = await this.authService.validateUser(authDto)
      if (!loggedIn)
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED)
      return {
        token: this.jwtService.sign(loggedIn),
        message: 'logged in successfully',
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }
  @Get('validate')
  async validateToken(@Req() req): Promise<any> {
    try {
      await this.jwtService.verifyAsync(req.headers.authorization, {
        secret: process.env.JWT_SECRET || 'superSecret',
      })
      return {message: 'Token is valid'}
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
