import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
	origin: process.env.ORIGIN ?? 'http://localhost:5173',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
