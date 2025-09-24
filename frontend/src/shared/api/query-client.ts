import { QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import toast from 'react-hot-toast';

type ErrorResponse = { message?: string };

async function extractMessage(err: HTTPError): Promise<string> {
	try {
		const data = (await err.response.json()) as ErrorResponse;

		return data?.message || 'Request error';
	} catch {
		return 'Request error';
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
		},
		mutations: {
			onError: async (err: unknown) => {
				if (err instanceof HTTPError) {
					toast.error(await extractMessage(err));
				} else {
					toast.error('Unknown error while performing the operation');
				}
			},
		},
	},
});
