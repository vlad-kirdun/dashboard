import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getRoles } from './get-roles';

export const roleQueries = {
	all: () => ['roles'],
	lists: () => [...roleQueries.all(), 'list'],
	list: () =>
		queryOptions({
			queryKey: [...roleQueries.lists()],
			queryFn: getRoles,
			placeholderData: keepPreviousData,
		}),
};
