import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTrusted = configService.get<string>('DB_USE_WINDOWS_AUTH') === 'true';
        return {
          type: 'mssql',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT'), 10),
          database: configService.get<string>('DB_NAME'),
          username: isTrusted ? undefined : configService.get<string>('DB_USERNAME'),
          password: isTrusted ? undefined : configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: false,
          options: {
            encrypt: configService.get<string>('STAGE') === 'prod',
            trustServerCertificate: true,
            trustedConnection: isTrusted,
          },
        };
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    CommonModule,

    AuthModule,

  ],
})
export class AppModule { }
