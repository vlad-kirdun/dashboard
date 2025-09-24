import { post } from '@/shared/api';

import type { LogoutResponse } from '../model';

export function logout(): Promise<LogoutResponse> {
	return post('auth/logout');
}
