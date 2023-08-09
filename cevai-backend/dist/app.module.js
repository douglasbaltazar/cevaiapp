"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const event_module_1 = require("./app/event/event.module");
const user_module_1 = require("./app/user/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mariadb',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: Number(configService.get('DB_PORT', 3306)),
                    username: configService.get('DB_USER', 'root'),
                    password: configService.get('DB_PASS', '123'),
                    database: configService.get('DB_NAME', 'cevai'),
                    entities: [__dirname + '/**/*.entity{.js,.ts}'],
                    synchronize: true,
                }),
            }),
            event_module_1.EventModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map