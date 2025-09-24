import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import appConfig from './config/app';
import corsConfig from './config/cors';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	const appCfg = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
	const corsCfg = app.get<ConfigType<typeof corsConfig>>(corsConfig.KEY);

	app.enableCors(corsCfg);

	const config = new DocumentBuilder()
		.setTitle('Admin Panel API')
		.setDescription('API for users and roles management')
		.setVersion('1.0')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(appCfg.port);
}

bootstrap();
