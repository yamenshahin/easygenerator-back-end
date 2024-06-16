import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UserModule} from '../user/user.module'
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'superSecret',
      signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '12h'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
