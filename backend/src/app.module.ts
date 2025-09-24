import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import appConfig from './config/app';
import databaseConfig from './config/database';
import corsConfig from './config/cors';
import jwtConfig from './config/jwt';
import { validate } from './config/env.validation';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [appConfig, databaseConfig, corsConfig, jwtConfig],
			validate,
		}),
		UsersModule,
		RolesModule,
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
