import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		const secret = configService.get('jwt.secret');

		if (!secret) {
			throw new Error('JWT secret is not defined in configuration');
		}

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.jwt]),
			ignoreExpiration: false,
			secretOrKey: secret,
		});
	}

	async validate(payload: any) {
		const { sub, iat, exp, ...data } = payload;

		return data;
	}
}
