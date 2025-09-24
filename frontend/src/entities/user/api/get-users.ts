import { get } from '@/shared/api';

import type { GetUsersQuery, GetUsersResponse } from '../model';

export function getUsers(query: GetUsersQuery): Promise<GetUsersResponse> {
	return get('users', query);
}
