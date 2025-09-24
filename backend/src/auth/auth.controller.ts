import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from './auth.constants';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { NodeEnv } from '../config/env.validation';
import { LoginDto } from './dto/login.dto';

import type { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService,
	) {}

	private cookieOptions(maxAge: number) {
		const isProduction = this.configService.get('app.nodeEnv') === NodeEnv.Production;
		const sameSite = isProduction ? ('none' as const) : ('strict' as const);

		return {
			httpOnly: true,
			secure: isProduction,
			sameSite,
			maxAge,
		};
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiBody({
		description: 'User credentials for login',
		type: LoginDto,
	})
	@ApiResponse({
		status: 201,
		description:
			'Sets HTTP-only cookies: `jwt` (access token) and `refresh` (refresh token), and returns basic user info.',
		schema: {
			example: {
				success: true,
				user: {
					id: '1',
					name: 'Admin',
					surname: 'Admin',
					email: 'admin@example.com',
					roles: ['ADMIN'],
				},
			},
		},
	})
	@ApiResponse({ status: 401, description: 'Invalid email or password' })
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.login(req.user);

		res.cookie('jwt', accessToken, this.cookieOptions(ACCESS_TOKEN_MAX_AGE));
		res.cookie('refresh', refreshToken, this.cookieOptions(REFRESH_TOKEN_MAX_AGE));

		return { success: true, user: req.user };
	}

	@Public()
	@Post('refresh')
	@ApiResponse({
		status: 201,
		description:
			'Refreshes access/refresh tokens using refresh cookie. Sets new cookies and returns `{ success: true }`.',
	})
	@ApiResponse({ status: 400, description: 'No refresh token provided' })
	@ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies?.refresh;
		if (!refreshToken) {
			return { success: false, message: 'No refresh token' };
		}

		try {
			const { accessToken, refreshToken: newRefresh } = await this.authService.refresh(refreshToken);

			res.cookie('jwt', accessToken, this.cookieOptions(ACCESS_TOKEN_MAX_AGE));
			res.cookie('refresh', newRefresh, this.cookieOptions(REFRESH_TOKEN_MAX_AGE));

			return { success: true };
		} catch {
			return { success: false, message: 'Invalid or expired refresh token' };
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@ApiResponse({
		status: 201,
		description: 'Clears `jwt` and `refresh` cookies, effectively logging the user out. Returns `{ success: true }`.',
	})
	@ApiResponse({ status: 401, description: 'User is not authenticated' })
	logout(@Res({ passthrough: true }) res: Response) {
		const isProduction = this.configService.get('app.nodeEnv') === NodeEnv.Production;

		res.clearCookie('jwt', {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? 'none' : 'strict',
		});

		res.clearCookie('refresh', {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? 'none' : 'strict',
		});

		return { success: true };
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	@ApiResponse({
		status: 200,
		description: 'Returns the authenticated user payload (decoded from JWT).',
		schema: {
			example: {
				id: '1',
				name: 'Admin',
				surname: 'Admin',
				email: 'admin@example.com',
				roles: ['ADMIN'],
			},
		},
	})
	@ApiResponse({ status: 401, description: 'User is not authenticated' })
	getProfile(@Req() req) {
		return req.user;
	}
}
