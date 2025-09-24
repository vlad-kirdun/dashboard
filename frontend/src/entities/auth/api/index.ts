import { authQueries } from './auth.queries';
import { login } from './login';
import { logout } from './logout';
import { refresh } from './refresh';

export const authApi = {
	authQueries,
	login,
	logout,
	refresh,
};
