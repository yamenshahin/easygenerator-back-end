import {HttpException, Injectable} from '@nestjs/common'
import {UserService} from '../user/user.service'
import * as bcrypt from 'bcrypt'
import {AuthDto} from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(authDto: AuthDto) {
    const existingUser = await this.userService.findOneByEmail(authDto.email)
    if (
      existingUser &&
      (await bcrypt.compare(authDto.password, existingUser.password))
    ) {
      const {password, ...user} = existingUser
      return user
    }
    return null
  }
}
