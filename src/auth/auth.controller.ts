import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthDto} from './dto/auth.dto'
import {JwtService} from '@nestjs/jwt'
import {AuthGuard} from '@nestjs/passport'

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

  // Add a protected route for authenticated users (replace with your actual route)
  @Get('protected')
  @UseGuards(AuthGuard('jwt')) // Use JWT authentication guard
  async getProtectedData() {
    return 'This is protected data accessible only with a valid JWT token.'
  }
}
