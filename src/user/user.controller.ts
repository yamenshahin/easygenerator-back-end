import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import {CreateUserDto} from './dto/user.dto'
import {UserService} from './user.service'
@Controller('users') // Defines base path for user endpoints (e.g., /users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto)
      return {message: 'user created successfully'}
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
