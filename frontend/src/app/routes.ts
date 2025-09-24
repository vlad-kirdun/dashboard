import { createBrowserRouter } from 'react-router';

import { Dashboard, Login } from '@/pages';

import { ROUTES } from '@/shared/constants';

import { AuthLayout, MainLayout } from './layouts';

export const router = createBrowserRouter([
	{
		path: ROUTES.Home,
		Component: MainLayout,
		children: [
			{ index: true, Component: Dashboard },
			{
				Component: AuthLayout,
				children: [{ path: ROUTES.Login, Component: Login }],
			},
		],
	},
]);
