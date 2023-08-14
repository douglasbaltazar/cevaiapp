import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  // ApiOperation,
  // ApiResponse
} from '@nestjs/swagger';
import { AuthUserEntity } from './entity/AuthUser';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('api/auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Logar um Usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario Logado',
    type: AuthUserEntity,
  })
  async login(@Req() req: AuthUserDto) {
    return await this.authService.login(req);
  }
}
