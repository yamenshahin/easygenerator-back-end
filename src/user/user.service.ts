import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {User} from '../schemas/user.schemas'
import {hash} from 'bcrypt'

const saltRounds = 10
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Create new user.
   *
   * @param {User} user - The user object containing the user's email and password.
   * @return {Promise<User>} - A promise that resolves to the saved user object.
   * @throws {Error} - If the user's email already exists.
   */
  async create(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({email: user.email})
    if (existingUser) {
      throw new Error('email already exists')
    }
    const newUser = new this.userModel(user)
    // Implement password hashing logic before saving the user
    newUser.password = await hash(user.password, saltRounds)
    return newUser.save()
  }
}
