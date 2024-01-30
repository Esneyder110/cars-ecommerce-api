import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AdminGuard, AuthGuard, UserGuard } from './guards';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_LIFETIME') },
      }),
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserGuard,
    AdminGuard,
  ],
  exports: [],
})
export class AuthModule {}
