import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum NodeEnv {
	Development = 'development',
	Production = 'production',
}

export class EnvironmentVariables {
	@IsNumber()
	PORT: number;

	@IsEnum(NodeEnv)
	NODE_ENV: NodeEnv;

	@IsString()
	DATABASE_URL: string;

	@IsString()
	JWT_SECRET: string;

	@IsString()
	ORIGIN: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}
