import {
  Controller,
  Get,
  Put,
  Post,
  Res,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IndexEventSwagger } from './swagger/index-event.swagger';
import { CreateEventSwagger } from './swagger/create-event.swagger';
import ShowEventSwagger from './swagger/show-event.swagger';
import UpdateEventSwagger from './swagger/update-event.swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { AuthGuard } from '@nestjs/passport';
import { MessagesHelper } from '../helpers/messages.helper';

@Controller('api/v1/events')
@ApiTags('events')
// @UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os eventos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos',
    type: IndexEventSwagger,
    isArray: true,
  })
  async index() {
    return await this.eventService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo evento' })
  @ApiResponse({
    status: 201,
    description: 'Novo evento criado',
    type: CreateEventSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateEventDto) {
    return await this.eventService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar um evento por Id' })
  @ApiResponse({
    status: 200,
    description: 'Dados de um evento',
    type: ShowEventSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Evento invalido',
    type: NotFoundSwagger,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.eventService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update de um evento' })
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado',
    type: UpdateEventSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parametros invalidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Evento invalido',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateEventDto,
  ) {
    return await this.eventService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete de um Evento' })
  @ApiResponse({ status: 204, description: 'Evento removido' })
  @ApiResponse({
    status: 404,
    description: 'Evento invalido',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.eventService.deleteById(id);
  }

  @Post('/:eventId/:userId')
  async putUserToParty(
    @Param('eventId', new ParseUUIDPipe()) eventId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
    // req: Request,
    @Res() res: Response,
  ) {
    await this.eventService.putUserToEvent(userId, eventId).then((resp) => {
      if (resp.response) {
        res.status(HttpStatus.CREATED).json({
          message: resp.message,
          status: 'success',
        });
      } else {
        res
          .status(resp.statusCode)
          .json({
            message: resp.message,
            status: 'error',
          })
          .send();
      }
    });
  }
  @Delete('/:eventId/:userId')
  async removeUserToParty(
    @Param('eventId', new ParseUUIDPipe()) eventId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
    // req: Request,
    @Res() res: Response,
  ) {
    await this.eventService.removeUserToEvent(userId, eventId).then((resp) => {
      if (resp.response) {
        res.status(HttpStatus.CREATED).json({
          message: resp.message,
          status: 'success',
        });
      } else {
        res
          .status(resp.statusCode)
          .json({
            message: resp.message,
            status: 'error',
          })
          .send();
      }
    });
    // if (await this.eventService.removeUserToEvent(userId, eventId)) {
    //   res.status(HttpStatus.CREATED).json({
    //     message: `O usuario de Id ${userId} removido com sucesso no evento de id ${eventId}`,
    //   });
    // } else {
    //   res.status(404).json({
    //     message: MessagesHelper.ERROR_404_MSG_USER_EVENT,
    //     error: MessagesHelper.ERROR_404,
    //   });
    // }
  }
}
