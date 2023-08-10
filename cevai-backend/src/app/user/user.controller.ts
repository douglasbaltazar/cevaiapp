import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  // ApiOperation,
  // ApiResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //@UseGuards(AuthGuard('jwt'))
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteById(id);
  }
}
