import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common'
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
}
