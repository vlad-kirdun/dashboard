import { get } from '@/shared/api';
import type { User } from '@/shared/model';

export function getProfile(): Promise<User> {
	return get('auth/profile');
}
