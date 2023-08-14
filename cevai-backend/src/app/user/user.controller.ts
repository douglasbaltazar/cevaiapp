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
  ApiOperation,
  ApiResponse,
  ApiTags,
  // ApiOperation,
  // ApiResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import ShowUserSwagger from './swagger/show-user.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import UpdateUserSwagger from './swagger/update-user.swagger';

@Controller('api/v1/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuarios ' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Usuarios',
    type: IndexUserSwagger,
    isArray: true,
  })
  //@UseGuards(AuthGuard('jwt'))
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Novo usuario criado',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Listar um Usuario por Id' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um Usuario',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario invalido',
    type: NotFoundSwagger,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update de um usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario atualizado',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario invalido',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete de um Usuario' })
  @ApiResponse({ status: 204, description: 'Usuario removido' })
  @ApiResponse({
    status: 404,
    description: 'Usuario invalido',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteById(id);
  }
}
