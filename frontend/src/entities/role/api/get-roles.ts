import { get } from '@/shared/api';
import type { RoleCode } from '@/shared/constants';

export function getRoles(): Promise<RoleCode[]> {
	return get('roles');
}
