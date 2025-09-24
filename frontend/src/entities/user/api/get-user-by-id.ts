import { get } from '@/shared/api';
import type { User } from '@/shared/model';

export function getUserById(id: string): Promise<User> {
	return get(`users/${id}`);
}
