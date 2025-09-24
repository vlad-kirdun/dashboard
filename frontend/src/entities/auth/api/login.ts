import { post } from '@/shared/api';

import type { LoginRequest, LoginResponse } from '../model';

export function login(body: LoginRequest): Promise<LoginResponse> {
	return post('auth/login', body);
}
