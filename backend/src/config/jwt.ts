import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
	secret: process.env.JWT_SECRET || 'supersecret',
	accessExpiresIn: '15m',
	refreshExpiresIn: '30d',
}));
