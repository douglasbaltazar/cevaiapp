import { Injectable } from '@nestjs/common';
import { UserEntity } from '../app/user/entity/user.entity';
import { UserService } from '../app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (e) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;
    return user;
  }

  async login(user: AuthUserDto) {
    const payload = { sub: user.id, email: user.email };
    let userFound: UserEntity;
    try {
      userFound = await this.userService.findOne(user.id);
      return {
        token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: userFound.firstName + ' ' + userFound.lastName,
        },
      };
    } catch (e) {
      return null;
    }
  }
}
