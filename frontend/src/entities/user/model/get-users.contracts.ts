import type { Order, RoleCode, SortBy } from '@/shared/constants';
import type { User } from '@/shared/model';

export type GetUsersQuery = {
	role?: RoleCode;
	page?: number;
	perPage?: number;
	sortBy?: SortBy;
	order?: Order;
};

export type GetUsersResponse = {
	data: User[];
	meta: {
		page: number;
		perPage: number;
		total: number;
		totalPages: number;
	};
};
