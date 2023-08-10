import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/app/user/entity/User.entity';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  async login(user) {
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
