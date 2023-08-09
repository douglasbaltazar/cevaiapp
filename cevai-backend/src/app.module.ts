import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './app/event/event.module';
import { EventEntity } from './app/event/entity/event.entity';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
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
    EventModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
