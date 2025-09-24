import { RouterProvider as ReactRouterProvider } from 'react-router/dom';

import type { FunctionComponent } from 'react';
import type { RouterProviderProps } from 'react-router/dom';

type Props = {
	router: RouterProviderProps['router'];
};

export const RouterProvider: FunctionComponent<Props> = ({ router }) => <ReactRouterProvider router={router} />;
