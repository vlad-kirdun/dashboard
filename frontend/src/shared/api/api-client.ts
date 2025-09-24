import ky from 'ky';

import { ROUTES } from '../constants';
import { queryClient } from './query-client';

import type { SearchParamsOption } from 'ky';

type RefreshResponse = {
	success: boolean;
};

export const api = ky.create({
	prefixUrl: import.meta.env.VITE_API_URL,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
	retry: {
		limit: 0,
		methods: ['get', 'post', 'put', 'patch', 'delete'],
	},
	timeout: 10000,
	hooks: {
		afterResponse: [
			async (request, options, response) => {
				if (response.status !== 401 || request.url.includes('/auth/profile')) return response;

				try {
					const { success } = await refreshToken();

					if (success) {
						return ky(request, options);
					}
				} catch (err) {
					console.error('Refresh failed', err);
				}

				queryClient.setQueryData(['profile'], null);

				if (window.location.pathname !== ROUTES.Login) {
					window.location.pathname = ROUTES.Login;
				}

				return response;
			},
		],
	},
});

export const get = <T>(url: string, searchParams?: SearchParamsOption) => api.get(url, { searchParams }).json<T>();

export const post = <T>(url: string, json?: unknown) => api.post(url, { json }).json<T>();

export const put = <T>(url: string, json?: unknown) => api.put(url, { json }).json<T>();

export const patch = <T>(url: string, json?: unknown) => api.patch(url, { json }).json<T>();

export const del = <T>(url: string) => api.delete(url).json<T>();

async function refreshToken(): Promise<RefreshResponse> {
	return post('auth/refresh');
}
