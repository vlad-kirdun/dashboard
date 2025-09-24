import { post } from '@/shared/api';

import type { RefreshResponse } from '../model';

export function refresh(): Promise<RefreshResponse> {
	return post('auth/refresh');
}
