import { queryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { getProfile } from './get-profile';

export const authQueries = {
	profile: () =>
		queryOptions({
			queryKey: ['profile'],
			queryFn: async () => {
				try {
					return await getProfile();
				} catch (err) {
					if (err instanceof HTTPError && err.response.status === 401) {
						return null;
					}
					throw err;
				}
			},
			staleTime: 5 * 60 * 1000,
			retry: false,
			refetchOnWindowFocus: false,
		}),
};
