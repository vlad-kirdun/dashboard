import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getUserById } from './get-user-by-id';
import { getUsers } from './get-users';

import type { GetUsersQuery } from '../model';

export const userQueries = {
	all: () => ['users'],
	lists: () => [...userQueries.all(), 'list'],
	list: (query: GetUsersQuery) =>
		queryOptions({
			queryKey: [...userQueries.lists(), query],
			queryFn: () => getUsers(query),
			placeholderData: keepPreviousData,
		}),
	details: () => [...userQueries.all(), 'detail'],
	detail: (userId: string) =>
		queryOptions({
			queryKey: [...userQueries.details(), userId],
			queryFn: () => getUserById(userId),
			staleTime: 5000,
		}),
};
