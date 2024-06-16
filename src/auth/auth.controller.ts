import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthDto} from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    try {
      const loggedIn = await this.authService.validateUser(authDto)
      if (!loggedIn)
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED)
      return {message: 'logged in successfully'}
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }
}
