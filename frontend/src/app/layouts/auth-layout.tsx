import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router';

import { authApi } from '@/entities';

import { ROUTES } from '@/shared/constants';
import { Spinner } from '@/shared/ui';

import type { FunctionComponent } from 'react';

export const AuthLayout: FunctionComponent = () => {
	const { data: currentUser, isLoading } = useQuery(authApi.authQueries.profile());

	if (isLoading) {
		return (
			<div className="flex flex-1 justify-center items-center bg-gray-50">
				<Spinner size={48} />
			</div>
		);
	}

	if (currentUser) {
		return <Navigate to={ROUTES.Home} replace />;
	}

	return (
		<div className="flex flex-1 justify-center items-center bg-gray-50">
			<Outlet />
		</div>
	);
};
