import { Roles } from './enums';

export type User = {
	id: string;
	name: string;
	surname: string;
	email: string;
	createdAt: Date;
	roles: Roles[];
};
