import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	EditableRoles,
	setPage,
	SortableTableHeadCell,
	useOrder,
	usePage,
	usePerPage,
	useRole,
	UsersPagination,
	UsersRoleFilter,
	useSortBy,
} from '@/features';

import { userApi } from '@/entities';

import { SortBy } from '@/shared/constants';
import { Shadow, TableBodyCell, TableHeadCell } from '@/shared/ui';

import { Name } from './name';
import { TableSkeleton } from './table-skeleton';

import type { FunctionComponent } from 'react';

export const UsersTable: FunctionComponent = () => {
	const { t } = useTranslation('dashboard');

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showShadows, setShowShadows] = useState({ left: false, right: false });

	const page = usePage();
	const perPage = usePerPage();
	const sortBy = useSortBy();
	const order = useOrder();
	const role = useRole();

	const { data: users, isLoading: isUsersLoading } = useQuery(
		userApi.userQueries.list({
			page,
			perPage,
			role: role === 'ALL' ? undefined : role,
			sortBy,
			order,
		}),
	);

	useLayoutEffect(() => {
		const el = scrollContainerRef.current;
		if (!el) return;

		const updateShadows = () => {
			const maxScrollLeft = el.scrollWidth - el.clientWidth;

			setShowShadows({
				left: el.scrollLeft > 0,
				right: maxScrollLeft > 0 && el.scrollLeft < maxScrollLeft - 1,
			});
		};

		updateShadows();

		el.addEventListener('scroll', updateShadows);
		window.addEventListener('resize', updateShadows);

		return () => {
			el.removeEventListener('scroll', updateShadows);
			window.removeEventListener('resize', updateShadows);
		};
	}, []);

	const handleChangeSortCallback = () => {
		setPage(1);
	};

	const handleChangeRoleCallback = () => {
		setPage(1);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold">{t('tables.users.title')}</h2>

				<UsersRoleFilter onChange={handleChangeRoleCallback} />
			</div>

			<div className="bg-white shadow rounded-md sm:rounded-lg overflow-hidden">
				<div className="relative">
					<div ref={scrollContainerRef} className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<SortableTableHeadCell
										columnName={SortBy.Name}
										disabled={isUsersLoading}
										className="w-2/5"
										onChange={handleChangeSortCallback}
									>
										{t('tables.users.columns.name')}
									</SortableTableHeadCell>
									<TableHeadCell className="w-1/5">{t('tables.users.columns.email')}</TableHeadCell>
									<TableHeadCell className="w-1/5 min-w-[280px]">{t('tables.users.columns.role')}</TableHeadCell>
									<SortableTableHeadCell
										columnName={SortBy.CreatedAt}
										disabled={isUsersLoading}
										className="text-right w-1/5"
										onChange={handleChangeSortCallback}
									>
										{t('tables.users.columns.created_at')}
									</SortableTableHeadCell>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{isUsersLoading ? (
									<TableSkeleton rows={perPage} />
								) : !isUsersLoading && !users?.data?.length ? (
									<tr>
										<TableBodyCell colSpan={4} className="text-center">
											{t('tables.placeholder')}
										</TableBodyCell>
									</tr>
								) : (
									users?.data?.map((row) => (
										<tr key={row.id} className="hover:bg-gray-50">
											<TableBodyCell>
												<Name user={row} />
											</TableBodyCell>
											<TableBodyCell>{row.email}</TableBodyCell>
											<TableBodyCell>
												<EditableRoles userId={row.id} />
											</TableBodyCell>
											<TableBodyCell className="text-right">
												{new Date(row.createdAt).toLocaleDateString()}
											</TableBodyCell>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{showShadows.left ? <Shadow position="left" /> : null}

					{showShadows.right ? <Shadow position="right" /> : null}
				</div>

				<UsersPagination totalPages={users?.meta?.totalPages} isLoading={isUsersLoading} />
			</div>
		</>
	);
};
