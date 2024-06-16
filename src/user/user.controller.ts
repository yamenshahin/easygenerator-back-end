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
  @Controller('users') // Defines base path for user endpoints (e.g., /users)
  export class UserController {
    constructor() {}
  
    @Post() 
    @UsePipes(new ValidationPipe()) 
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            return {message: 'user created successfully'}
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
  }
}