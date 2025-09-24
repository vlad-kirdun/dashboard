import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { FunctionComponent, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	client: QueryClient;
};

export const QueryProvider: FunctionComponent<Props> = ({ client, children }) => (
	<QueryClientProvider client={client}>
		{children}

		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
