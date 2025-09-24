import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import { Header } from '@/widgets';

import type { FunctionComponent } from 'react';

export const MainLayout: FunctionComponent = () => (
	<>
		<Header />

		<main className="min-h-screen flex pt-16">
			<Outlet />

			<Toaster position="top-right" />
		</main>
	</>
);
