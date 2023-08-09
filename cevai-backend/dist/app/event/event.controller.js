"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const swagger_1 = require("@nestjs/swagger");
const index_event_swagger_1 = require("./swagger/index-event.swagger");
const create_event_swagger_1 = require("./swagger/create-event.swagger");
const show_event_swagger_1 = require("./swagger/show-event.swagger");
const update_event_swagger_1 = require("./swagger/update-event.swagger");
const bad_request_swagger_1 = require("../helpers/swagger/bad-request.swagger");
const not_found_swagger_1 = require("../helpers/swagger/not-found.swagger");
const passport_1 = require("@nestjs/passport");
let EventController = exports.EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async index() {
        return await this.eventService.findAll();
    }
    async create(body) {
        return await this.eventService.create(body);
    }
    async show(id) {
        return await this.eventService.findOne(id);
    }
    async update(id, body) {
        return await this.eventService.update(id, body);
    }
    async destroy(id) {
        await this.eventService.deleteById(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os eventos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de eventos',
        type: index_event_swagger_1.IndexEventSwagger,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar um novo evento' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Novo evento criado',
        type: create_event_swagger_1.CreateEventSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Parametros invalidos',
        type: bad_request_swagger_1.BadRequestSwagger,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar um evento por Id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados de um evento',
        type: show_event_swagger_1.default,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Parametros invalidos',
        type: bad_request_swagger_1.BadRequestSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Evento invalido',
        type: not_found_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "show", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update de um evento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Evento atualizado',
        type: update_event_swagger_1.default,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Parametros invalidos',
        type: bad_request_swagger_1.BadRequestSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Evento invalido',
        type: not_found_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete de um Evento' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Evento removido' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Evento invalido',
        type: not_found_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "destroy", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('api/v1/events'),
    (0, swagger_1.ApiTags)('events'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map