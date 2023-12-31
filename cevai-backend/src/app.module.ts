import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventModule } from './app/event/event.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { UserEntity } from './app/user/entity/user.entity';
import { EventEntity } from './app/event/entity/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mariadb',
          host: configService.get('DB_HOST', 'localhost'),
          port: Number(configService.get('DB_PORT', 3306)),
          username: configService.get('DB_USER', 'root'),
          password: configService.get('DB_PASS', '123'),
          database: configService.get('DB_NAME', 'cevai'),
          entities: [__dirname + '/**/*.entity{.js,.ts}'],
          synchronize: true,
        } as TypeOrmModuleOptions),
    }),
    EventModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
