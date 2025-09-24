import { patch } from '@/shared/api';
import type { User } from '@/shared/model';

import type { UpdateUserRolesContracts } from '../model';

export function updateUserRoles(userId: string, body: UpdateUserRolesContracts): Promise<User> {
	return patch<User>(`users/${userId}/roles`, body);
}
