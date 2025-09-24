import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from './auth.constants';
import { NodeEnv } from '../config/env.validation';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: jest.Mocked<AuthService>;
	let configService: jest.Mocked<ConfigService>;

	const mockAuthService = {
		login: jest.fn(),
		refresh: jest.fn(),
	};

	const mockConfigService = {
		get: jest.fn().mockReturnValue(NodeEnv.Development),
	};

	const mockRes = () => {
		const cookies: Record<string, any> = {};
		return {
			cookie: jest.fn((name, value, options) => {
				cookies[name] = { value, options };
			}),
			clearCookie: jest.fn((name) => {
				delete cookies[name];
			}),
			cookies,
		} as any;
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: ConfigService, useValue: mockConfigService },
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get(AuthService);
		configService = module.get(ConfigService);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('login', () => {
		it('should set cookies and return user', async () => {
			const user = { id: 1, email: 'test@test.com' };
			authService.login.mockResolvedValue({
				accessToken: 'access123',
				refreshToken: 'refresh123',
				user: {},
			});

			const res = mockRes();
			const req: any = { user };

			const result = await controller.login(req, res);

			expect(result).toEqual({ success: true, user });
			expect(res.cookie).toHaveBeenCalledWith(
				'jwt',
				'access123',
				expect.objectContaining({
					httpOnly: true,
					maxAge: ACCESS_TOKEN_MAX_AGE,
				}),
			);
			expect(res.cookie).toHaveBeenCalledWith(
				'refresh',
				'refresh123',
				expect.objectContaining({
					httpOnly: true,
					maxAge: REFRESH_TOKEN_MAX_AGE,
				}),
			);
		});
	});

	describe('refresh', () => {
		it('should return error if no refresh cookie', async () => {
			const req: any = { cookies: {} };
			const res = mockRes();

			const result = await controller.refresh(req, res);

			expect(result).toEqual({ success: false, message: 'No refresh token' });
			expect(authService.refresh).not.toHaveBeenCalled();
		});

		it('should refresh tokens and set cookies', async () => {
			authService.refresh.mockResolvedValue({
				accessToken: 'newAccess',
				refreshToken: 'newRefresh',
			});

			const req: any = { cookies: { refresh: 'oldRefresh' } };
			const res = mockRes();

			const result = await controller.refresh(req, res);

			expect(result).toEqual({ success: true });
			expect(authService.refresh).toHaveBeenCalledWith('oldRefresh');
			expect(res.cookie).toHaveBeenCalledWith(
				'jwt',
				'newAccess',
				expect.objectContaining({ maxAge: ACCESS_TOKEN_MAX_AGE }),
			);
			expect(res.cookie).toHaveBeenCalledWith(
				'refresh',
				'newRefresh',
				expect.objectContaining({ maxAge: REFRESH_TOKEN_MAX_AGE }),
			);
		});

		it('should handle refresh failure', async () => {
			authService.refresh.mockRejectedValue(new Error('invalid'));

			const req: any = { cookies: { refresh: 'broken' } };
			const res = mockRes();

			const result = await controller.refresh(req, res);

			expect(result).toEqual({
				success: false,
				message: 'Invalid or expired refresh token',
			});
		});
	});

	describe('logout', () => {
		it('should clear cookies and return success', () => {
			const res = mockRes();
			const result = controller.logout(res);

			expect(result).toEqual({ success: true });
			expect(res.clearCookie).toHaveBeenCalledWith('jwt', expect.objectContaining({ httpOnly: true }));
			expect(res.clearCookie).toHaveBeenCalledWith('refresh', expect.objectContaining({ httpOnly: true }));
		});
	});

	describe('getProfile', () => {
		it('should return user from request', () => {
			const req: any = { user: { id: 42 } };
			expect(controller.getProfile(req)).toEqual({ id: 42 });
		});
	});
});
