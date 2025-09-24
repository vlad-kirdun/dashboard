import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { queryClient } from '@/shared/api';
import '@/shared/config/i18n';

import { QueryProvider, RouterProvider } from './providers';
import { router } from './routes';
import './global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryProvider>
	</StrictMode>,
);
