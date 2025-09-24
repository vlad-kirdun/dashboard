import type { RoleCode } from '../constants/roles';

export type User = {
	id: string;
	name: string;
	surname: string;
	email: string;
	createdAt: string;
	roles: RoleCode[];
};
