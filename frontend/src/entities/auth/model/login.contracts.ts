import type { User } from '@/shared/model';

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	user: User;
};
