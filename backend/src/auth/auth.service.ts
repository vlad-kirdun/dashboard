import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const user = await this.usersService.findByEmail(email);

		if (user && (await bcrypt.compare(pass, user.password))) {
			const { password, ...result } = user;

			return result;
		}

		return null;
	}

	async generateTokens(user: any) {
		const payload = {
			sub: user?.id,
			...user,
		};

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
		});

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
		});

		return { accessToken, refreshToken };
	}

	async login(user: any) {
		const tokens = await this.generateTokens(user);

		return { user, ...tokens };
	}

	async refresh(refreshToken: string) {
		try {
			const payload = this.jwtService.verify(refreshToken);
			const { iat, exp, ...userData } = payload;

			return this.generateTokens(userData);
		} catch {
			throw new UnauthorizedException('Invalid or expired refresh token');
		}
	}
}
