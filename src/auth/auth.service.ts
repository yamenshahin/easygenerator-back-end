import {HttpException, Injectable} from '@nestjs/common'
import {UserService} from '../user/user.service'
import * as bcrypt from 'bcrypt'
import {AuthDto} from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userService.findOneByEmail(authDto.email)
    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      const {password, ...result} = user
      return result
    }
    return null
  }
}
